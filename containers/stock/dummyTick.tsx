import { frontStockQuery } from "../../__generated__/frontStockQuery";
import { frontStockTick } from "../../__generated__/frontStockTick";

// ... (previous code)

const generateTickData = (length: number): frontStockTick => {
    const tickData: frontStockTick = {
        gsStock: Array.from({ length }, (_, index) => ({
            __typename: "Gs",
            index: index + 1,
            date: 20230101 + index,
            check_item: `Example ${index + 1}`,
            code: 123 + index,
            code_name: String.fromCharCode(65 + index % 26) + String.fromCharCode(65 + (index + 1) % 26),
            price: index
        })),
    };

    return tickData;
};

export default generateTickData;