import { formatMoneyDecimal, plural } from "../format";
import { t } from "../t";
import { OrderSide, OrderStatus } from "../../types";
import { Currency } from "../format";

export const copy = {
  common: {
    continue: () => t("common.continue"),
    cancel: () => t("common.cancel"),
    loading: () => t("common.loading"),
    retry: () => t("common.retry"),
  },
  navigation: {
    greeting: (name?: string) =>
      t("navigation.greeting", {
        name: name ?? t("navigation.defaultUser"),
      }),
    userPlaceholder: () => t("navigation.defaultUser"),
    instrumentsTitle: () => t("navigation.instrumentsTitle"),
    portfolioTitle: () => t("navigation.portfolioTitle"),
    searchTitle: () => t("navigation.searchTitle"),
  },
  search: {
    placeholder: () => t("search.placeholder"),
    emptyTitle: () => t("search.emptyTitle"),
    emptyDescription: () => t("search.emptyDescription"),
    noResultsTitle: () => t("search.noResultsTitle"),
    noResultsDescription: (query: string) =>
      t("search.noResultsDescription", { query }),
  },
  instruments: {
    accessibilityLabel: (ticker: string) =>
      t("instruments.accessibilityLabel", { ticker }),
  },
  portfolio: {
    totalLabel: () => t("portfolio.totalLabel"),
    emptyMessage: () => t("portfolio.emptyMessage"),
    quantity: (quantity: number) =>
      `${quantity} ${plural(quantity, {
        one: t("portfolio.position.quantitySingular"),
        other: t("portfolio.position.quantityPlural"),
      })}`,
    profitLabel: () => t("portfolio.position.profitLabel"),
    avgCostLabel: () => t("portfolio.position.avgCostLabel"),
    lastPriceLabel: () => t("portfolio.position.lastPriceLabel"),
  },
  orders: {
    modal: {
      titleNew: () => t("orders.modal.titleNew"),
      titleResult: () => t("orders.modal.titleResult"),
      newOrderCta: () => t("orders.modal.newOrderCta"),
    },
    form: {
      priceCurrentLabel: () => t("orders.form.priceCurrentLabel"),
      priceLimitLabel: () => t("orders.form.priceLimitLabel"),
      pricePlaceholder: () => t("orders.form.pricePlaceholder"),
      totalEstimatedLabel: () => t("orders.form.totalEstimatedLabel"),
      submitLabel: (side: OrderSide) =>
        side === "BUY"
          ? t("orders.form.submitBuy")
          : t("orders.form.submitSell"),
    },
    quantityInput: {
      labelQuantity: () => t("orders.quantityInput.quantityLabel"),
      labelAmount: () => t("orders.quantityInput.amountLabel"),
      toggleToAmount: () => t("orders.quantityInput.toggleToAmount"),
      toggleToQuantity: () => t("orders.quantityInput.toggleToQuantity"),
      quantityPlaceholder: () => t("orders.quantityInput.quantityPlaceholder"),
      amountPlaceholder: () => t("orders.quantityInput.amountPlaceholder"),
      quantitySuffix: () => t("orders.quantityInput.quantitySuffix"),
      calculatedLabel: (quantity: number) =>
        `${t("orders.quantityInput.calculatedLabel")}: ${quantity} ${t(
          "orders.quantityInput.quantitySuffix"
        )}`,
      unitPriceLabel: () => t("orders.quantityInput.unitPriceLabel"),
    },
    typeSelector: {
      sideLabel: () => t("orders.typeSelector.sideLabel"),
      buy: () => t("orders.typeSelector.buy"),
      sell: () => t("orders.typeSelector.sell"),
      typeLabel: () => t("orders.typeSelector.typeLabel"),
      market: () => t("orders.typeSelector.market"),
      limit: () => t("orders.typeSelector.limit"),
    },
    response: {
      idLabel: () => t("orders.response.idLabel"),
      statusLabel: (status: OrderStatus) =>
        t(`orders.response.${status.toLowerCase()}Label`),
      statusMessage: (status: OrderStatus) =>
        t(`orders.response.${status.toLowerCase()}Message`),
      statusHint: (status: OrderStatus) => {
        if (status === "PENDING") return t("orders.response.pendingHint");
        if (status === "REJECTED") return t("orders.response.rejectedHint");
        return null;
      },
    },
    totals: {
      formattedTotal: (amount: number, currency: Currency) =>
        `${t("orders.form.totalEstimatedLabel")}: ${formatMoneyDecimal(
          amount,
          currency
        )}`,
    },
  },
  errors: {
    generic: () => t("errors.generic"),
  },
  validation: {
    quantityPositive: () => t("validation.quantityPositive"),
    pricePositive: () => t("validation.pricePositive"),
    priceRequiredForLimit: () => t("validation.priceRequiredForLimit"),
  },
} as const;
