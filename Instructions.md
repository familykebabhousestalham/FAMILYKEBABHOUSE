# Pizza and Garlic Bread Pricing Fix Instructions

## Problem Analysis

**Current Issue**: Pizzas and garlic bread items are not displaying their 10"/12" pricing options or "Add to Basket" buttons in the Menu page.

**Root Cause**: The `renderPriceDisplay` function in `client/src/components/menu-category.tsx` has a logic flow issue. The pizza/garlic bread pricing logic (lines 101-133) is being bypassed due to the ordering of conditional checks.

**API Data Confirmation**:

- Pizzas have `price10inches` and `price12inches` fields populated correctly (e.g., Margherita: 10"=£8.00, 12"=£10.00)
- Garlic bread items also have `price10inches` and `price12inches` fields populated (e.g., Garlic Bread V: 10"=£5.00, 12"=£7.00)
- The API mapping in `server/storage.ts` correctly transforms snake_case DB fields to camelCase client fields

## Step-by-Step Fix Plan

### Step 1: Reorder Logic in menu-category.tsx

**File**: `client/src/components/menu-category.tsx`  
**Function**: `renderPriceDisplay` (lines 42-169)

**Change**: Move the pizza-inch pricing logic (lines 101-133) to execute BEFORE the Medium/Large/X-Large logic (lines 44-77).

**Reason**: Currently, the function checks for `priceMedium || priceLarge || priceXLarge` first, but pizza items should be handled by the inch-based pricing logic regardless of whether they have other price fields.

**Implementation**:

```typescript
function renderPriceDisplay(item: MenuItemData) {
  // 1) Pizza‐inch logic (10″ / 12″) - MOVE THIS FIRST
  if (item.price10inches != null || item.price12inches != null) {
    const inches = [
      item.price10inches != null && { label: '10\"', price: item.price10inches },
      item.price12inches != null && { label: '12\"', price: item.price12inches }
    ].filter(Boolean) as { label: string; price: number }[]

    return (
      <div className="text-right space-y-1 sm:space-y-2">
        <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
          {inches.map(i => <span key={i.label}>{i.label}</span>)}
        </div>
        <div className="grid grid-cols-2 gap-1 sm:gap-2 font-bold text-primary text-sm sm:text-base">
          {inches.map(i => <span key={i.label}>{formatPrice(i.price)}</span>)}
        </div>
        <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2">
          {inches.map(i => (
            <AddToBasketButton
              key={i.label}
              item={{
                id:           `${item.id}-${i.label}`,
                name:         `${item.name} (${i.label})`,
                category:     item.category,
                singlePrice:  i.price,
                description:  item.description
              }}
              variant="small"
            />
          ))}
        </div>
      </div>
    )
  }

  // 2) Multi‐size items (Medium/Large/X-Large) - MOVE THIS SECOND
  if (item.priceMedium || item.priceLarge || item.priceXLarge) {
    // ... existing logic
  }

  // 3) Single‐price items - KEEP AS IS
  if (item.singlePrice != null) {
    // ... existing logic
  }

  // 4) Fallback small/med/lg/xl - KEEP AS IS
  // ... existing logic
}
```

### Step 2: Verify Categories Are Using Correct Data

**File**: `client/src/pages/menu.tsx`

**Check**: Ensure that the categories "pizzas" and "garlic-bread-pizza-extras" are properly fetching items from the API with the correct category names.

**Expected Behavior**:

- Pizzas category should display items with 10"/12" size options
- Garlic Bread & Pizza Extras category should display items with 10"/12" size options  
- Each size should have its own "Add to Basket" button

### Step 3: Test Functionality

**Manual Testing Steps**:

1. Navigate to Menu page
2. Scroll to "Pizzas" section
3. Verify each pizza shows two columns: "10\"" and "12\"" with respective prices
4. Verify each pizza has two "Add to Basket" buttons (one per size)
5. Scroll to "Garlic Bread & Pizza Extras" section  
6. Verify same behavior for garlic bread items
7. Test adding items to basket with different sizes
8. Verify basket shows correct size in item name (e.g., "Margherita (10\")")

### Step 4: Ensure Accessibility Compliance

**Verification**:

- Keyboard navigation should work for all new "Add to Basket" buttons
- Screen readers should announce size options clearly
- ARIA labels should be preserved from existing implementation

### Step 5: Verify Mobile Responsiveness

**Check**: Ensure the 2-column grid layout (10"/12") works correctly on mobile devices without text overflow or button cramping.

## Expected Outcome

After implementing this fix:

- ✅ Pizza items will display "10\"" and "12\"" price columns with respective pricing
- ✅ Garlic bread items will display "10\"" and "12\"" price columns with respective pricing  
- ✅ Each size will have its own functional "Add to Basket" button
- ✅ Basket will correctly identify items by size (e.g., "Margherita (10\")" vs "Margherita (12\")")
- ✅ All existing functionality for other categories (kebabs, burgers, etc.) will remain unchanged
- ✅ Keyboard navigation and accessibility features will be preserved

## Files to Modify

1. `client/src/components/menu-category.tsx` - Reorder logic in `renderPriceDisplay` function

## No API Changes Required

The API is already returning the correct data structure. The issue is purely in the frontend component logic ordering.
