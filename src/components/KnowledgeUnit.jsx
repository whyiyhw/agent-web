import {useEffect, useState, useTransition} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {knowledgeUnitList as getKnowledgeUnitList, knowledgeUnitDelete, knowledgeUnitSwitch} from "../api/api";
import PropTypes from "prop-types";
import {KNOWLEDGE, KNOWLEDGE_SEGMENTS} from "@/routes/app/routes";
import DataSet from "../assets/dataset.png";
import {Trash, Pencil} from "lucide-react";
import KnowledgeCreate from "@/components/KnowledgeCreate";
import KnowledgeUnitCreate from "@/components/KnowledgeUnitCreate";

const KnowledgeUnitList = () => {
    const [listItems, setListItems] = useState([]);
    const [page, setPage] = useState(1);                    // 声明 page 的 state
    const [pageNumber] = useState(9);                       // 假设你已经定义了这个
    const [pageCount, setPageCount] = useState(0);          // 假设你已经定义了这个
    const [isModalOpen, setIsModalOpen] = useState(false);  // 声明 modal 的 state
    const [isModalUnitOpen, setIsModalUnitOpen] = useState(false);  // 声明 modal 的 state
    const navigate = useNavigate();
    let [, startTransition] = useTransition();
    const location = useLocation();
    const knowledgeId = location.state.knowledgeId;
    const [knowledgeName, setKnowledgeName] = useState(location.state.knowledgeName);
    const [knowledgeDesc, setKnowledgeDesc] = useState(location.state.knowledgeDesc);
    console.log(knowledgeId, knowledgeName, knowledgeDesc)

    const showKnowledgeModal = () => {
        setIsModalOpen(true);
    };

    const hideKnowledgeModal = (isRefresh = false) => {
        console.log("hideKnowledgeModal", isRefresh)
        setIsModalOpen(false);
        // 强制 刷新页面
        if (isRefresh) {
            toGetData();
        }
    }
    const showKnowledgeUnitModal = () => {
        setIsModalUnitOpen(true);
    }
    const hideKnowledgeUnitModal = (isRefresh = false) => {
        console.log("hideKnowledgeUnitModal", isRefresh)
        setIsModalUnitOpen(false);
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
            const ls = await getKnowledgeUnitList(knowledgeId, page, pageNumber);
            setListItems(ls.data.list);
            setPageCount(Math.ceil(ls.data.total / pageNumber));
        }

        fetchData().then(r => console.log(r));
    }

    useEffect(toGetData, [page, pageNumber, knowledgeId, knowledgeName, knowledgeDesc]);

    const toKnowledgeUnitDelete = (id) => {
        knowledgeUnitDelete(id).then(r => {
                if (r.code === 200) {
                    // 去删除数据 重新渲染页面
                    setListItems(listItems.filter(item => item.id !== id))
                }
            }
        );
    }
    const toKnowledgeUnitSwitch = (id) => {
        knowledgeUnitSwitch(id).then(r => {
                if (r.code === 200) {
                    setListItems(listItems.map(item => {
                        if (item.id === id) {
                            item.enable = !item.enable
                        }
                        return item
                    }))
                }
            }
        );
    }
    const toJumpKnowledge = () => {
        // 跳转到知识库页面
        startTransition(() => {
            navigate(KNOWLEDGE);
        });
    }

    const toJumpKnowledgeSegment = (id) => {
        startTransition(() => {
            navigate(KNOWLEDGE_SEGMENTS, {state: {knowledgeId: knowledgeId, knowledgeUnitId: id}});
        });
    }

    return (
        <div className="min-h-screen w-11/12 p-0 m-0  text-base-content">
            <header className="flex flex-col justify-between items-center p-5 ">
                <h1 className="text-xl w-full flex flex-row justify-between items-center">
                    <div className="">
                        <button className="text-gray-400" onClick={toJumpKnowledge}>知识库 /</button>
                        <span> 知识单元</span>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => showKnowledgeUnitModal()}>创建知识单元
                        </button>
                    </div>
                    {isModalUnitOpen && <KnowledgeUnitCreate
                        hideKnowledgeUnitModal={hideKnowledgeUnitModal}
                        knowledgeId={knowledgeId}
                    />}
                </h1>
                <div className="flex flex-row w-full space-x-4 m-5">
                    <div>
                        <img src={DataSet} alt="avatar preview"
                             className={"w-12 rounded-box  overflow-hidden h-12"}/>
                    </div>
                    <div className="flex flex-col">
                        <div className=" text-2xl">{knowledgeName}</div>
                        <div className="text-sm">{knowledgeDesc}</div>
                    </div>
                    <div className="btn btn-sm btn-ghost text-primary  h-1/2" onClick={showKnowledgeModal}>
                        <button>
                            <Pencil size={16}/>
                        </button>
                        <span>编辑</span>
                    </div>
                </div>
                {isModalOpen && <KnowledgeCreate
                    hideKnowledgeModal={hideKnowledgeModal}
                    knowledgeId={knowledgeId}
                    knowledgeName={knowledgeName}
                    knowledgeDesc={knowledgeDesc}
                    setKnowledgeName={setKnowledgeName}
                    setKnowledgeDesc={setKnowledgeDesc}
                />}
            </header>

            <KnowledgeUnitListItem items={listItems} toKnowledgeUnitDelete={toKnowledgeUnitDelete}
                                   toKnowledgeUnitSwitch={toKnowledgeUnitSwitch}
                                   toJumpKnowledgeSegment={toJumpKnowledgeSegment}
            />

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


const KnowledgeUnitListItem = ({items, toKnowledgeUnitDelete, toKnowledgeUnitSwitch, toJumpKnowledgeSegment}) => {
    return (
        <section className="flex flex-wrap w-full flex-grow h-3/5">
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className=" text-primary opacity-80">
                        <th></th>
                        <th>名称</th>
                        <th>类型</th>
                        <th>来源</th>
                        <th>创建时间</th>
                        <th>更新时间</th>
                        <th>开关</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={index} className="hover">
                                <th></th>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.source}</td>
                                <td>{item.create_time}</td>
                                <td>{item.update_time}</td>
                                <td>
                                    <div className="form-control">
                                        <label className="cursor-pointer label">
                                            <input type="checkbox" className="toggle toggle-sm toggle-primary"
                                                   checked={item.enable}
                                                   onChange={() => toKnowledgeUnitSwitch(item.id)}
                                            />
                                        </label>
                                    </div>
                                </td>
                                <td className=" space-x-4">
                                    <button className="btn btn-circle btn-xs btn-ghost">
                                        <Pencil size={16}
                                                onClick={() => toJumpKnowledgeSegment(item.id)}/>
                                    </button>
                                    <button className="btn btn-circle btn-xs btn-ghost"
                                            onClick={() => toKnowledgeUnitDelete(item.id)}>
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

KnowledgeUnitListItem.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            source: PropTypes.string.isRequired,
            enable: PropTypes.bool.isRequired,
            create_time: PropTypes.string.isRequired,
            update_time: PropTypes.string.isRequired,
        })
    ),
    toKnowledgeUnitDelete: PropTypes.func.isRequired,
    toKnowledgeUnitSwitch: PropTypes.func.isRequired,
    toJumpKnowledgeSegment: PropTypes.func.isRequired,
};
KnowledgeUnitList.propTypes = {};

export default KnowledgeUnitList;
