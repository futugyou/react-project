import './Examples.css'

import { useState, useEffect, lazy } from "react"
import {  useNavigate } from "react-router-dom"
import { BsSearch } from "react-icons/bs"

import Dropdown, { DropdownItem } from "@/Common/Dropdown"
import MiniModal from '@/Common/MiniModal'
import { ExampleModel, DefaultExampleModel } from '../Models/ExampleModel'
import set from '../Services/Example'

const ExampleDetail = lazy(() => import('./ExampleDetail'))
const ExampleEdit = lazy(() => import('./ExampleEdit'))

const ModalExampleDetail = (props: any) => {
    return (
        <MiniModal show={props.showModal} setShow={props.setShowModal} size='middle' >
            <ExampleDetail data={props.exampleData} onEidtClick={() => props.onModeChange(true)}></ExampleDetail>
        </MiniModal>
    )
}
const ModalExampleEdit = (props: any) => {
    return (
        <MiniModal show={props.showModal} setShow={props.setShowModal} size='middle'  >
            <ExampleEdit data={props.exampleData} onCancelClick={() => props.onModeChange(false)} onSaveClick={props.handleSaveClick}></ExampleEdit>
        </MiniModal>
    )
}

const Examples = (props: any) => { 
    const navigate = useNavigate()

    const [editMode, setEditMode] = useState(false)
    const [exampleList, setExampleList] = useState([] as ExampleModel[])
    const [exampleData, setExampleData] = useState<ExampleModel>(exampleList.length > 1 ? exampleList[0] : DefaultExampleModel)
    const [searchFilter, setSearchFilter] = useState({ key: "", category: "chooseAll" })
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const getAllExamples = async () => {
            let lista = await set.getAllExamples()
            lista = lista.filter((p: ExampleModel) => p.title != undefined && p.title.length > 0)
                .sort((a: ExampleModel, b: ExampleModel) => {
                    if (a.key > b.key) {
                        return 1
                    }
                    if (a.key < b.key) {
                        return -1
                    }
                    return 0
                })

            const list = lista
                .filter((p: ExampleModel) => p.tags == undefined || p.tags.findIndex(element => {
                    return element.toLowerCase() === searchFilter.category.toLowerCase()
                        || searchFilter.category === "chooseAll";
                }) >= 0)
                .filter((p: ExampleModel) => searchFilter.key === ""
                    || p.title.toLowerCase().includes(searchFilter.key.toLowerCase())
                    || p.description.toLowerCase().includes(searchFilter.key.toLowerCase()))

            setExampleList(list)
        }

        getAllExamples()
    }, [searchFilter])

    const categories: DropdownItem[] = [
        {
            key: "chooseAll",
            value: "All Categories",
        },
        {
            key: "answers",
            value: "answers",
        },
        {
            key: "classification",
            value: "classification",
        },
        {
            key: "code",
            value: "code",
        },
        {
            key: "conversation",
            value: "conversation",
        },
        {
            key: "generation",
            value: "generation",
        },
        {
            key: "translation",
            value: "translation",
        },
        {
            key: "transformation",
            value: "transformation",
        },
    ]

    const onExampleClick = (item: ExampleModel) => {
        setExampleData({ ...DefaultExampleModel, ...item })
        setEditMode(false)
        setShowModal(true)
    }

    const exampleItems = exampleList.map(item => {
        return (
            <div key={item.key} className="example-item" onClick={() => onExampleClick(item)}>
                <div className="example-item-left">
                    <BsSearch></BsSearch>
                </div>
                <div className="example-item-right">
                    <div className="example-item-title">{item.title}</div>
                    <div className="example-item-description">{item.subTitle}</div>
                </div>
            </div>
        )
    })

    const HandleCategoryChange = (category: string) => {
        setSearchFilter({
            ...searchFilter,
            category: category,
        })
    }

    const handleKeyworkChange = (e: any) => {
        const k: string = e.target.value;
        setSearchFilter({
            ...searchFilter,
            key: k ?? "",
        })
    }

    const onModeChange = (f: boolean) => {
        setEditMode(() => f)
    }

    const handleSaveClick = () => {
        setEditMode(false)
        document.getElementById('closeModal')!.click()
        let path = location.pathname || "/"
        navigate(path, { replace: true })
    }

    return (
        <div className="example-page">
            <ModalExampleDetail key={exampleData.key + 'Detail'} showModal={showModal && !editMode} setShowModal={setShowModal} onModeChange={onModeChange} exampleData={exampleData} ></ModalExampleDetail>
            <ModalExampleEdit key={exampleData.key + 'Edit'} showModal={showModal && editMode} setShowModal={setShowModal} onModeChange={onModeChange} exampleData={exampleData} handleSaveClick={handleSaveClick}></ModalExampleEdit>

            <div className="example-container">
                <div className="example-header">
                    <h1 className="text-title">Examples</h1>
                    <h3 className="text-tagline">Explore what's possible with some example applications</h3>
                </div>
                <div className="example-search">
                    <div className="example-search-input-container">
                        <BsSearch className="search-icon"></BsSearch>
                        <input className="example-search-input" onChange={handleKeyworkChange}></input>
                    </div>
                    <div className="example-search-dropdowm-container">
                        <Dropdown items={categories} onDropdownChange={HandleCategoryChange}></Dropdown>
                    </div>
                </div>
                <div className="example-item-container">
                    {exampleItems}
                </div>
            </div>
        </div >
    )
}

export default Examples