import React from 'react';

const Item: React.FC = () => {
    return (
        <div className="w-96 h-96 md:w-64 md:h-64 bg-gray-300">
            ff

        </div>
    )
}

const ShopPage: React.FC = () => {
  return (
    <div>
    <div className="flex w-full h-full p-4 items-center justify-evenly text-sm border-0 border-t border-b border-black">
    <h1>Shop</h1>
    </div>
    <div className="flex md:flex-row flex-col w-full h-screen p-4 items-center md:justify-center justify-col">
        <div className="flex md:flex-col flex-row md:w-1/4 w-full h-full bg-gray-200 justify-top">
            <div>category</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>

        </div>
        <div className="flex flex-wrap md:w-auto md:justify-start justify-center w-3/4 h-full bg-gray-100 gap-16" >
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />

        </div>
    </div>
    </div>
  );
};

export default ShopPage;