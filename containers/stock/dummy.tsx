import { frontStockQuery } from "../../__generated__/frontStockQuery";
import { frontStockTick } from "../../__generated__/frontStockTick";

// ... (previous code)

const generateDummyData = (length: number): frontStockQuery => {
    const dummyData: frontStockQuery = {
        gsStock: Array.from({ length }, (_, index) => ({
            __typename: "Gs",
            index: index + 1,
            date: 20230101 + index,
            check_item: `Example ${index + 1}`,
            code: 123 + index,
            code_name: String.fromCharCode(65 + index % 26) + String.fromCharCode(65 + (index + 1) % 26),
            d1_diff_rate: Math.random() * index * 2 - 1, // Random value between -1 and 1
            close: Math.random() * index * 500 + 900, // Random value between 900 and 1400
            open: Math.random() * index * 500 + 900,
            high: Math.random() * index * 500 + 900,
            low: Math.random() * index * 500 + 900,
            volume: Math.random() * index * 50000 + 50000, // Random value between 50000 and 100000
            clo5: Math.random() * index * 100 + 900,
            clo10: Math.random() * index * 100 + 900,
            clo20: Math.random() * index * 100 + 900,
            clo40: Math.random() * index * 100 + 900,
            clo60: Math.random() * index * 100 + 900,
            clo80: Math.random() * index * 100 + 900,
            clo100: Math.random() * index * 100 + 900,
            clo120: Math.random() * index * 100 + 900,
            clo5_diff_rate: Math.random() * index * 4 - 2, // Random value between -2 and 2
            clo10_diff_rate: Math.random() * index * 2 - 1,
            clo20_diff_rate: Math.random() * index * 2 - 1,
            clo40_diff_rate: Math.random() * index * 2 - 1,
            clo60_diff_rate: Math.random() * index * 2 - 1,
            clo80_diff_rate: Math.random() * index * 2 - 1,
            clo100_diff_rate: Math.random() * index * 2 - 1,
            clo120_diff_rate: Math.random() * index * 2 - 1,
            yes_clo5: Math.random() * index * 100 + 900,
            yes_clo10: Math.random() * index * 100 + 900,
            yes_clo20: Math.random() * index * 100 + 900,
            yes_clo40: Math.random() * index * 100 + 900,
            yes_clo60: Math.random() * index * 100 + 900,
            yes_clo80: Math.random() * index * 100 + 900,
            yes_clo100: Math.random() * index * 100 + 900,
            yes_clo120: Math.random() * index * 100 + 900,
            vol5: Math.random() * index * 50000 + 50000,
            vol10: Math.random() * index * 50000 + 50000,
            vol20: Math.random() * index * 50000 + 50000,
            vol40: Math.random() * index * 50000 + 50000,
            vol60: Math.random() * index * 50000 + 50000,
            vol80: Math.random() * index * 50000 + 50000,
            vol100: Math.random() * index * 50000 + 50000,
            vol120: Math.random() * index * 50000 + 50000,
        })),
    };

    return dummyData;
};

export default generateDummyData;
