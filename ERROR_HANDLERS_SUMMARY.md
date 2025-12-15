# Error Handlers and Fallback Messages - Location Summary

This document catalogs all error handling locations in the Quake Wallet application that have been marked with `TODO: centralize errors` comments. These locations should be refactored to use a centralized error handler in the future `src/errors` directory.

## Summary

**Total locations marked:** 12

**Categories:**
- API Layer: 1 location
- Redux State Management: 3 locations
- Screen Components: 4 locations
- UI Components: 4 locations

---

## 1. API Layer Error Handling

### 1.1 API Client Interceptor
**File:** `src/services/api/client.ts`
**Line:** 12
**Type:** Axios response interceptor
**Description:** Catches all API errors and logs them to console. Handles three error types:
- Server response errors (error.response)
- Network errors (error.request)
- Other errors (error.message)

**Current Behavior:**
```typescript
// TODO: centralize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
```

---

## 2. Redux State Management Error Handling

All Redux slices follow the same pattern with fallback error messages in the `.rejected` cases.

### 2.1 Instruments Slice
**File:** `src/store/slices/instrumentsSlice.ts`
**Line:** 40
**Thunk:** `fetchInstruments`
**Fallback Message:** `'Failed to fetch instruments'`

```typescript
.addCase(fetchInstruments.rejected, (state, action) => {
  state.loading = false;
  // TODO: centralize errors
  state.error = action.error.message || 'Failed to fetch instruments';
});
```

### 2.2 Portfolio Slice
**File:** `src/store/slices/portfolioSlice.ts`
**Line:** 40
**Thunk:** `fetchPortfolio`
**Fallback Message:** `'Failed to fetch portfolio'`

```typescript
.addCase(fetchPortfolio.rejected, (state, action) => {
  state.loading = false;
  // TODO: centralize errors
  state.error = action.error.message || 'Failed to fetch portfolio';
});
```

### 2.3 Orders Slice
**File:** `src/store/slices/ordersSlice.ts`
**Line:** 50
**Thunk:** `createOrder`
**Fallback Message:** `'Failed to create order'`

```typescript
.addCase(createOrder.rejected, (state, action) => {
  state.loading = false;
  // TODO: centralize errors
  state.error = action.error.message || 'Failed to create order';
});
```

---

## 3. Screen Components Error Display

### 3.1 InstrumentsScreen
**File:** `src/screens/InstrumentsScreen.tsx`
**Line:** 42
**Type:** Error state rendering
**Description:** Displays ErrorMessage component when instruments fail to load and no cached data exists.

```typescript
if (error && !instruments) {
  // TODO: centralize errors
  return <ErrorMessage message={error} onRetry={handleRetry} />;
}
```

### 3.2 PortfolioScreen - Full Error
**File:** `src/screens/PortfolioScreen.tsx`
**Line:** 39
**Type:** Error state rendering
**Description:** Displays ErrorMessage component when portfolio fails to load and no cached data exists.

```typescript
if (error && !positions) {
  // TODO: centralize errors
  return <ErrorMessage message={error} onRetry={handleRetry} />;
}
```

### 3.3 PortfolioScreen - Error Banner
**File:** `src/screens/PortfolioScreen.tsx`
**Line:** 69
**Type:** Error banner rendering
**Description:** Displays error banner at bottom when refresh fails but cached data exists.

```typescript
{error && positions && (
  // TODO: centralize errors
  <View testID="portfolio-error-banner" style={styles.errorBanner}>
    <Text style={styles.errorBannerText}>{error}</Text>
  </View>
)}
```

### 3.4 SearchScreen
**File:** `src/screens/SearchScreen.tsx`
**Line:** 31
**Type:** Try-catch error handling
**Description:** Catches search API errors and logs to console, clears results.

```typescript
try {
  const searchResults = await instrumentsApi.search(debouncedQuery);
  setResults(searchResults);
} catch (err) {
  // TODO: centralize errors
  console.error("Error searching instruments:", err);
  setResults([]);
}
```

---

## 4. UI Components Error Display

### 4.1 ErrorMessage Component
**File:** `src/components/common/ErrorMessage.tsx`
**Line:** 9
**Type:** Reusable error display component
**Description:** Generic error message component with optional retry button.

```typescript
// TODO: centralize errors
export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View testID="error-message" style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry}>
          <Text>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
```

### 4.2 OrderModal - Order Error Display
**File:** `src/components/orders/OrderModal.tsx`
**Line:** 125
**Type:** Error box rendering
**Description:** Displays order creation errors in a styled error box with icon.

```typescript
{error && (
  // TODO: centralize errors
  <View testID="order-modal-error" style={styles.errorBox}>
    <Ionicons name="alert-circle-outline" size={16} color={TOKENS.danger} />
    <Text style={styles.errorText}>{error}</Text>
  </View>
)}
```

### 4.3 OrderForm - Quantity Validation Error
**File:** `src/components/orders/OrderForm.tsx`
**Line:** 142
**Type:** Form validation error display
**Description:** Displays validation errors for quantity field from React Hook Form.

```typescript
{errors.quantity?.message ? (
  // TODO: centralize errors
  <Text style={styles.errorText}>{errors.quantity.message}</Text>
) : null}
```

### 4.4 OrderForm - Price Validation Error
**File:** `src/components/orders/OrderForm.tsx`
**Line:** 165
**Type:** Form validation error display
**Description:** Displays validation errors for price field from React Hook Form (LIMIT orders only).

```typescript
{errors.price?.message ? (
  // TODO: centralize errors
  <Text style={styles.errorText}>{errors.price.message}</Text>
) : null}
```

---

## Error Handling Patterns Identified

### Pattern 1: API Interceptor
- **Location:** API client
- **Mechanism:** Axios response interceptor
- **Current Action:** Console logging
- **Needs:** Transform to user-friendly messages, proper error codes

### Pattern 2: Redux Async Thunk Rejection
- **Location:** Redux slices
- **Mechanism:** `.addCase(thunk.rejected, ...)`
- **Current Action:** Set error message in state with fallback
- **Needs:** Consistent error message formatting, error classification

### Pattern 3: Component Error Display
- **Location:** Screens and components
- **Mechanism:** Conditional rendering based on error state
- **Current Action:** Display error message to user
- **Needs:** Consistent UI/UX for errors, proper error recovery flows

### Pattern 4: Try-Catch Blocks
- **Location:** SearchScreen
- **Mechanism:** Traditional try-catch
- **Current Action:** Console logging
- **Needs:** User-facing error messages, error tracking

### Pattern 5: Form Validation Errors
- **Location:** OrderForm
- **Mechanism:** React Hook Form + Zod validation
- **Current Action:** Display validation error messages
- **Needs:** Consistent error message styling and positioning

---

## Recommendations for Centralized Error Handler

Based on the locations identified, the centralized error handler should:

1. **Error Classification System**
   - Network errors (connection issues, timeouts)
   - Server errors (4xx, 5xx status codes)
   - Validation errors (client-side validation)
   - Business logic errors (rejected orders, insufficient funds)

2. **User-Friendly Messages**
   - Map technical errors to user-friendly Spanish messages
   - Provide actionable feedback (retry, check connection, etc.)

3. **Error Tracking**
   - Log errors for debugging
   - Track error patterns for monitoring

4. **Recovery Strategies**
   - Automatic retry for transient errors
   - Fallback to cached data when appropriate
   - Clear recovery actions for users

5. **Consistent UI Components**
   - Standardized error display components
   - Consistent styling and positioning
   - Proper accessibility support

---

## Next Steps

1. Create `src/errors` directory structure
2. Implement centralized error handler with error classification
3. Create user-friendly error message mappings (Spanish)
4. Refactor API interceptor to use centralized handler
5. Refactor Redux slices to use centralized error formatting
6. Update components to use standardized error display
7. Add error tracking/monitoring integration
8. Update tests to cover centralized error handling

---

**Document Created:** December 15, 2025
**Last Updated:** December 15, 2025
**Status:** Ready for implementation of centralized error handler
