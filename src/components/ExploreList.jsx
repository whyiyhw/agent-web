import {startTransition, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {botReplicate, exploreBotList} from "../api/api";
import ReactPaginate from "react-paginate";
import {BOTS} from "../routes/app/routes.jsx";
import BotCard from "./BotCard";
import PropTypes from "prop-types";

const ExploreBotList = () => {
    // useEffect 调用 botList 来重新加载 listItems
    const navigate = useNavigate();
    const [listItems, setListItems] = useState([]);
    const [page, setPage] = useState(1);                    // 声明 page 的 state
    const [pageNumber] = useState(16);                       // 假设你已经定义了这个
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
        botReplicate(id, 2).then(r => {
            if (r.code === 200) {
                // 跳转至 bots
                startTransition(() => {
                    navigate(BOTS);
                });
            }
        })
    }

    return (
        <div className="h-screen w-11/12 p-0 m-0">
            <header className="flex justify-between items-center m-5">
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
        <section className="flex flex-wrap w-11/12  flex-grow h-4/5">
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

List.propTypes = {
    items: PropTypes.array.isRequired,
    goBotReplicate: PropTypes.func.isRequired,
}
export default ExploreBotList;
