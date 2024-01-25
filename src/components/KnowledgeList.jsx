import {useEffect, useState, useTransition} from 'react';
import ReactPaginate from 'react-paginate';
import {knowledgeDelete, knowledgeList} from "../api/api";
import KnowledgeCreate from "@/components/KnowledgeCreate";
import {Trash, Pencil} from "lucide-react";
import PropTypes from "prop-types";
import {KNOWLEDGE_UNIT} from "@/routes/app/routes";
import {useNavigate} from "react-router-dom";

const KnowledgeList = () => {
    const [listItems, setListItems] = useState([]);
    const [page, setPage] = useState(1);                    // 声明 page 的 state
    const [pageNumber] = useState(9);                       // 假设你已经定义了这个
    const [pageCount, setPageCount] = useState(0);          // 假设你已经定义了这个
    const [isModalOpen, setIsModalOpen] = useState(false);  // 声明 modal 的 state
    const navigate = useNavigate();
    let [, startTransition] = useTransition();

    const showKnowledgeModal = () => {
        setIsModalOpen(true);
    };

    const hideKnowledgeModal = (isRefresh = false) => {
        setIsModalOpen(false);
        // 强制 刷新页面
        if (isRefresh) {
            toGetKnowledgeListData();
        }
    }

    function handlePageClick({selected: selectedPage}) {
        selectedPage += 1
        setPage(selectedPage);
    }

    const toGetKnowledgeListData = () => {
        const fetchData = async () => {
            const ls = await knowledgeList(page, pageNumber);
            setListItems(ls.data.list);
            setPageCount(Math.ceil(ls.data.total / pageNumber));
        }

        fetchData().then(r => console.log(r));
    }

    useEffect(toGetKnowledgeListData, [page, pageNumber]);

    const toKnowledgeDelete = (id) => {
        knowledgeDelete(id).then(r => {
                r.code === 200 && setListItems(listItems.filter(item => item.id !== id))
            }
        );
    }

    const toJumpKnowledgeUnit = (id, name, desc) => {
        // 跳转到知识库详情页
        startTransition(() => {
            navigate(KNOWLEDGE_UNIT, {state: {knowledgeId: id, knowledgeName: name, knowledgeDesc: desc}});
        });
    }

    return (
        <div className="min-h-screen w-11/12 p-0 m-0  text-base-content">
            <header className="flex justify-between items-center p-5 ">
                <h1 className="text-2xl">知识库</h1>
                <button className="btn btn-primary " onClick={() => showKnowledgeModal()}>创建知识库
                </button>
                {isModalOpen && <KnowledgeCreate hideKnowledgeModal={hideKnowledgeModal}/>}
            </header>

            <KnowledgeListItem items={listItems} toKnowledgeDelete={toKnowledgeDelete}
                               toJumpKnowledgeUnit={toJumpKnowledgeUnit}/>

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


const KnowledgeListItem = ({items, toKnowledgeDelete, toJumpKnowledgeUnit}) => {
    return (
        <section className="flex flex-wrap w-full flex-grow h-3/5">
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className=" text-primary opacity-80">
                        <th></th>
                        <th>名称</th>
                        <th>描述</th>
                        <th>创建时间</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={index} className="hover">
                                <th></th>
                                <td>{item.name}</td>
                                <td>{item.desc}</td>
                                <td>{item.create_time}</td>
                                <td>{item.update_time}</td>
                                <td className=" space-x-4">
                                    <button className="btn btn-circle btn-xs btn-ghost"
                                            onClick={() => toJumpKnowledgeUnit(item.id, item.name, item.desc)}>
                                        <Pencil size={16}/>
                                    </button>
                                    <button className="btn btn-circle btn-xs btn-ghost"
                                            onClick={() => toKnowledgeDelete(item.id)}>
                                        <Trash size={16} color={"red"}/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

KnowledgeListItem.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            create_time: PropTypes.string.isRequired,
            update_time: PropTypes.string.isRequired,
        })
    ),
    toKnowledgeDelete: PropTypes.func.isRequired,
    toJumpKnowledgeUnit: PropTypes.func.isRequired,
};
KnowledgeList.propTypes = {};

export default KnowledgeList;
