/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: frontStockQuery
// ====================================================

export interface frontStockTick_gsStock {
  __typename: "Gs";
  index: number;
  date: number;
  check_item: string;
  code: number;
  code_name: string;
  price: number;
}

export interface frontStockTick {
  gsStock: frontStockTick_gsStock[];
}
