import {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {botList, botCreate, botDelete} from "../api/api";
import BotCreate from "./BotCreate";
import BotCard from "./BotCard";

const BotList = () => {
    // useEffect 调用 botList 来重新加载 listItems
    const [listItems, setListItems] = useState([]);
    const [page, setPage] = useState(1);                    // 声明 page 的 state
    const [pageNumber] = useState(9);                       // 假设你已经定义了这个
    const [pageCount, setPageCount] = useState(0);          // 假设你已经定义了这个
    const [isModalOpen, setIsModalOpen] = useState(false);  // 声明 modal 的 state
    const [activeBotId, setActiveBotId] = useState(0);      // 声明 activeBotId 的 state

    const showBotModal = (id) => {
        setIsModalOpen(true);
        console.log(isModalOpen)
        setActiveBotId(id)
    };
    const hideBotModal = (isRefresh = false) => {
        console.log("hideBotModal", isRefresh)
        setIsModalOpen(false);
        // 强制 刷新页面
        if (isRefresh) {
            toGetData();
        }
    }

    function handlePageClick({selected: selectedPage}) {
        console.log(selectedPage)
        selectedPage += 1
        setPage(selectedPage);
    }

    const toGetData = () => {
        const fetchData = async () => {
            const ls = await botList(page, pageNumber);
            setListItems(ls.data.list);
            setPageCount(Math.ceil(ls.data.total / ls.data.page_size));
        }

        fetchData().then(r => console.log(r));
    }
    useEffect(toGetData, [page, pageNumber]);


    const toBotDelete = (id) => {
        botDelete(id).then(r => {
                if (r.code === 200) {
                    // 去删除数据 重新渲染页面
                    setListItems(listItems.filter(item => item.id !== id))
                }
            }
        );
    }

    const goBotReplicate = (id, name, avatar, desc) => {
        botCreate(name, avatar, desc).then(r => {
            if (r.code === 200) {
                // 强制刷新
                toGetData()
            }
        })
    }

    return (
        <div className="min-h-screen w-11/12 p-0 m-0  text-base-content">
            <header className="flex justify-between items-center p-5 ">
                <h1 className="text-2xl">Bots</h1>
                <button className="btn" onClick={() => showBotModal(0)}>创建 Bot
                </button>
                {isModalOpen && <BotCreate hideBotModal={hideBotModal} botId={activeBotId}/>}
            </header>

            <List items={listItems} toBotDelete={toBotDelete} goBotReplicate={goBotReplicate}
                  showBotModal={showBotModal}/>

            {pageCount !== 0 && <ReactPaginate
                previousLabel={"perv"}
                nextLabel={"next"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-end space-x-2 mt-4"}
                pageLinkClassName={"btn btn-circle"}
                disabledClassName={"btn-disabled"}
                activeClassName={"btn-circle"}
                previousClassName={"btn btn-circle"}
                nextClassName={"btn btn-circle"}
            />}
        </div>
    );
}


const List = ({items, toBotDelete, goBotReplicate, showBotModal}) => {
    return (
        <section className="flex flex-wrap w-11/12 flex-grow h-1/2">
            {items.map((item, index) => (
                <BotCard id={item.id}
                         title={item.name}
                         description={item.desc}
                         avatar={item.avatar}
                         key={index}
                         toBotDelete={toBotDelete}
                         goBotReplicate={goBotReplicate}
                         showBotModal={showBotModal}
                />
            ))}
        </section>
    );
};
List.propTypes = {};
BotList.propTypes = {};

export default BotList;
