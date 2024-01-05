import BotCard from "./BotCard";
import React, {startTransition, useEffect, useState} from "react";
import {botReplicate, exploreBotList} from "../api/api";
import ReactPaginate from "react-paginate";
import {BOTS} from "../routes/app/routes";
import {useNavigate} from "react-router-dom";

const ExploreBotList = () => {
    // useEffect 调用 botList 来重新加载 listItems
    const navigate = useNavigate();
    const [listItems, setListItems] = React.useState([]);
    const [page, setPage] = useState(1);                    // 声明 page 的 state
    const [pageNumber] = useState(9);                       // 假设你已经定义了这个
    const [pageCount, setPageCount] = useState(0);          // 假设你已经定义了这个

    function handlePageClick({selected: selectedPage}) {
        selectedPage += 1
        setPage(selectedPage);
    }

    const toGetData = () => {
        const fetchData = async () => {
            const ls = await exploreBotList(page, pageNumber);
            console.log(ls.data)
            setListItems(ls.data.list);
            setPageCount(Math.ceil(ls.data.total / ls.data.page_size));
        }

        fetchData().then(r => console.log(r));
    }
    useEffect(toGetData, [page, pageNumber]);

    const goBotReplicate = (id) => {
        botReplicate(id,2).then(r => {
            if (r.code === 200) {
                // 跳转至 bots
                startTransition(() => {
                    navigate(BOTS);
                });
            }
        })
    }

    return (
        <div className="h-screen w-11/12  text-base-content ">
            <header className="flex justify-between items-center p-5 ">
                <h1 className="text-2xl">Explore</h1>
            </header>

            <List items={listItems} goBotReplicate={goBotReplicate}/>

            {pageCount !== 0 && <ReactPaginate
                previousLabel={"perv"}
                nextLabel={"next"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-end space-x-2 mt-4"}
                pageLinkClassName={"btn btn-circle "}
                disabledClassName={"btn-disabled "}
                activeClassName={"btn-circle "}
                previousClassName={"btn btn-circle "}
                nextClassName={"btn btn-circle "}
            />}
        </div>
    );
}

const List = ({items, goBotReplicate}) => {
    return (
        <section className="flex flex-wrap">
            {items.map((item, index) => (
                <BotCard id={item.id}
                         title={item.key}
                         key={index}
                         goBotReplicate={goBotReplicate}
                />
            ))}
        </section>
    );
};

export default ExploreBotList;
