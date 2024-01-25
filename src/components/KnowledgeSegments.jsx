import {useEffect, useState, useTransition} from 'react';
import ReactPaginate from 'react-paginate';
import {getKnowledgeSegmentList, knowledgeSegmentDelete, knowledgeUnitDetail} from "../api/api";
import {Trash, Pencil} from "lucide-react";
import PropTypes from "prop-types";
import {KNOWLEDGE,} from "@/routes/app/routes.jsx";
import DataSet from "../assets/dataUnit.jpg";
import {useLocation, useNavigate} from "react-router-dom";
import KnowledgeSegmentCreate from "@/components/KnowledgeSegmentCreate";
import KnowledgeUnitCreate from "@/components/KnowledgeUnitCreate.jsx";

const KnowledgeSegments = () => {
    const [listItems, setListItems] = useState([]);
    const [page, setPage] = useState(1);                    // 声明 page 的 state
    const [pageNumber] = useState(9);                       // 假设你已经定义了这个
    const [pageCount, setPageCount] = useState(0);          // 假设你已经定义了这个
    const [knowledgeUnitName, setKnowledgeUnitName] = useState(""); // 知识库单元名称
    const [activeKnowledgeSegmentId, setActiveKnowledgeSegmentId] = useState(0); // 知识点 id
    const [activeKnowledgeSegmentValue, setActiveKnowledgeSegmentValue] = useState(""); // 知识点 value
    const [isModalOpen, setIsModalOpen] = useState(false);  // 声明 modal 的 state
    const [isModalSegmentOpen, setIsModalSegmentOpen] = useState(false);  // 声明 modal 的 state
    const navigate = useNavigate();
    let [, startTransition] = useTransition();
    const location = useLocation();
    const knowledgeId = location.state.knowledgeId;
    const knowledgeUnitId = location.state.knowledgeUnitId;

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
    const showKnowledgeSegmentModal = () => {
        setIsModalSegmentOpen(true);
    }
    const hideKnowledgeSegmentModal = (isRefresh = false) => {
        console.log("hideKnowledgeSegmentModal", isRefresh)
        setIsModalSegmentOpen(false);
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

    const handleKnowledgeSegmentClick = (id, value) => {
        setActiveKnowledgeSegmentId(id)
        setActiveKnowledgeSegmentValue(value)
        showKnowledgeSegmentModal()
    }


    const toGetData = () => {
        const fetchData = async () => {
            const ls = await getKnowledgeSegmentList(knowledgeId, knowledgeUnitId, page, pageNumber);
            setListItems(ls.data.list);
            setPageCount(Math.ceil(ls.data.total / pageNumber));

            const unit = await knowledgeUnitDetail(knowledgeUnitId);
            console.log(unit.data)
            setKnowledgeUnitName(unit.data.name)
        }

        fetchData().then(r => console.log(r));
    }

    useEffect(toGetData, [page, pageNumber, knowledgeId, knowledgeUnitId]);

    const toKnowledgeSegmentDelete = (id) => {
        knowledgeSegmentDelete(id).then(r => {
                if (r.code === 200) {
                    // 去删除数据 重新渲染页面
                    setListItems(listItems.filter(item => item.id !== id))
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

    return (
        <div className="min-h-screen w-11/12 p-0 m-0  text-base-content">
            <header className="flex flex-col justify-between items-center p-5 ">
                <h1 className="text-xl w-full flex flex-row justify-between items-center">
                    <div className="">
                        <button className="text-gray-400" onClick={toJumpKnowledge}>知识库 / 知识单元 /</button>
                        <span> 知识点</span>
                    </div>
                    <div>
                        <button className="btn btn-primary"
                                onClick={() => handleKnowledgeSegmentClick(0, "")}
                        >
                            创建知识点
                        </button>
                    </div>
                    {isModalSegmentOpen && <KnowledgeSegmentCreate
                        hideKnowledgeSegmentModal={hideKnowledgeSegmentModal}
                        knowledgeId={knowledgeId}
                        knowledgeUnitId={knowledgeUnitId}
                        knowledgeSegmentId={activeKnowledgeSegmentId}
                        knowledgeSegmentValue={activeKnowledgeSegmentValue}
                    />}
                </h1>
                <div className="flex flex-row w-full space-x-4 m-5">
                    <div>
                        <img src={DataSet ?? ""} alt="avatar preview"
                             className={"w-12 rounded-box  overflow-hidden h-12"}/>
                    </div>
                    <div className="flex flex-col">
                        <div className=" text-2xl">{knowledgeUnitName}</div>
                    </div>
                    <div className="btn btn-sm btn-ghost text-primary  h-1/2" onClick={showKnowledgeModal}>
                        <button>
                            <Pencil size={16}/>
                        </button>
                        <span>编辑</span>
                    </div>
                </div>
                {isModalOpen &&
                    <KnowledgeUnitCreate
                        hideKnowledgeUnitModal={hideKnowledgeModal} knowledgeId={knowledgeId}
                        knowledgeUnitId={knowledgeUnitId}
                    />}
            </header>

            <KnowledgeSegmentList items={listItems}
                                  toKnowledgeSegmentDelete={toKnowledgeSegmentDelete}
                                  handleKnowledgeSegmentClick={handleKnowledgeSegmentClick}
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


const KnowledgeSegmentList = ({items, toKnowledgeSegmentDelete, handleKnowledgeSegmentClick}) => {
    return (
        <section className="flex flex-wrap w-full flex-grow h-3/5">
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className=" text-primary opacity-80">
                        <th></th>
                        <th>内容</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={index} className="hover">
                                <th></th>
                                <td>{item.value}</td>
                                <td>{item.update_time}</td>
                                <td className=" space-x-4">
                                    <button className="btn btn-circle btn-xs btn-ghost"
                                            onClick={() => {
                                                handleKnowledgeSegmentClick(item.id, item.value)
                                            }}
                                    >
                                        <Pencil size={16}/>
                                    </button>
                                    <button className="btn btn-circle btn-xs btn-ghost"
                                            onClick={() => toKnowledgeSegmentDelete(item.id)}>
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

KnowledgeSegmentList.propTypes = {
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
    toKnowledgeSegmentDelete: PropTypes.func.isRequired,
    handleKnowledgeSegmentClick: PropTypes.func.isRequired,
};

KnowledgeSegments.propTypes = {};

export default KnowledgeSegments;
