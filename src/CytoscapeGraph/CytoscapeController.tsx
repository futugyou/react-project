import './CytoscapeController.css'

import React, { useEffect, useState, useCallback } from 'react'

import cytoscape from 'cytoscape'
import avsdf from 'cytoscape-avsdf'
import euler from 'cytoscape-euler'
import fcose from 'cytoscape-fcose'

import Select from "@cloudscape-design/components/select"
import Button from "@cloudscape-design/components/button"
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs"

import singleAccount from '@/CytoscapeGraph/data/singleAccount.json'
import singleAccountDuplicates from '@/CytoscapeGraph/data/singleAccountDuplicates.json'
import { useGetResourceGraph } from '@/CytoscapeGraph/Hooks/useGetResourceGraph'
import { processElements } from '@/CytoscapeGraph/Processors/APIProcessors'
import { useCytoscapeCore } from '@/CytoscapeGraph/Contexts/CytoscapeContext'
import { ConfigResourceData } from '@/CytoscapeGraph/Processors/APIModel'
import { ActionType, CytoscapeData } from './Contexts/Reducers/CytoscapeReducer'

cytoscape.use(avsdf)
cytoscape.use(euler)
cytoscape.use(fcose)

interface CytoscapeControllerProps {
    setVisible: (state: boolean) => void
    visible: boolean
}

const CytoscapeController = ({ visible, setVisible }: CytoscapeControllerProps) => {
    const { state: { Core: cy }, dispatch } = useCytoscapeCore()

    const layoutSelection = [
        { label: "avsdf", value: "avsdf" },
        { label: "euler", value: "euler" },
        { label: "fcose", value: "fcose" },
        { label: "random", value: "random" },
        { label: "grid", value: "grid" },
        { label: "circle", value: "circle" },
        { label: "concentric", value: "concentric" },
        { label: "cose", value: "cose" },
    ]

    const [dataSelection, setDataSelection] = useState([
        { label: "aws-data-1", value: "aws-data-1" },
        { label: "aws-data-2", value: "aws-data-2" },
    ])

    const [selectedLayout, setSelectedLayout] = useState(layoutSelection[2])
    const [selectedData, setSelectedData] = useState(null)

    const [awsconfigData, setAwsconfigData] = useState<cytoscape.ElementDefinition[]>()
    const [newconfigData, setNewconfigData] = useState<cytoscape.ElementDefinition[]>()
    const { data: oldAWSData, isError: isoldAWSError } = useGetResourceGraph('v1/awsconfig')
    const { data: newAWSData, isError: isnewAWSError } = useGetResourceGraph('v1/newconfig')

    const onLayoutSelectChange = ({ detail }: any) => {
        setSelectedLayout(detail.selectedOption)
        cy.layout({ name: detail.selectedOption.value }).run()
        setVisible(false)
    }

    const onDataSelectChange = ({ detail }: any) => {
        const key = detail.selectedOption.value
        setSelectedData(detail.selectedOption)
        cy.elements().remove()

        const dataSources: Record<string, any> = {
            "aws-data-1": singleAccount,
            "aws-data-2": singleAccountDuplicates,
            "aws-config": awsconfigData,
            "new-config": newconfigData
        }

        const targetData = dataSources[key]
        if (targetData) {
            cy.add(targetData as cytoscape.ElementDefinition[])
        }

        cy.layout({ name: selectedLayout.value }).run()

        if (key === "aws-config" || key === "new-config") {
            const api = cy.expandCollapse('get')
            const selector = 'node[type = "type"], node[type = "ecsCluster"], node[type = "cloudmap"]'
            api.collapseRecursively(cy.elements(selector))
        }

        setVisible(false)
    }

    const downLoad = () => {
        if (cy) {
            cy.resize()
            const j = cy.json()
            var png64 = cy.png({ full: true })
            // document.querySelector('#png-eg')!.setAttribute('src', png64)
            // var jpg64 = cy.jpg({ full: true })
            // document.querySelector('#jpg-eg')!.setAttribute('src', jpg64)
            downloadImage(png64, "graph.png")
            // downloadImage(jpg64, "graph.jpg")
            setVisible(false)
        }
    }

    const downloadImage = (dataUrl: string, name: string) => {
        const a = document.createElement('a')
        a.setAttribute('download', name)
        a.setAttribute('href', dataUrl)
        a.click()
    }

    const filterElements = (rawData: ConfigResourceData) => {
        const data = processElements(rawData)
        const nodes = data.filter(p => p.group === "nodes")
        const edges = data.filter(p =>
            p.group === "edges" &&
            nodes.some(n => n.data.id === p.data.source) &&
            nodes.some(n => n.data.id === p.data.target)
        )
        return [...nodes, ...edges]
    }

    const updateConfigState = (
        data: ConfigResourceData | undefined,
        error: boolean,
        configKey: string,
        setDataState: (d: cytoscape.ElementDefinition[]) => void
    ) => {
        if (data && !error) {
            const filteredData = filterElements(data)
            setDataState(filteredData)

            setDataSelection(prev => {
                if (prev.some(p => p.value === configKey)) return prev
                return [...prev, { label: configKey, value: configKey }]
            })
        } else {
            setDataSelection(prev => prev.filter(p => p.value !== configKey))
        }
    }

    useEffect(() => {
        updateConfigState(oldAWSData, isoldAWSError, 'aws-config', setAwsconfigData)
    }, [oldAWSData, isoldAWSError])

    useEffect(() => {
        updateConfigState(newAWSData, isnewAWSError, 'new-config', setNewconfigData)
    }, [newAWSData, isnewAWSError])

    const updateCytoscapeData = useCallback((data: CytoscapeData) => {
        dispatch({
            type: ActionType.SetResource,
            Data: data,
        })
    }, [dispatch])

    const updateCytoscapeLayout = useCallback((layout: string) => {
        dispatch({
            type: ActionType.ChangeLayout,
            Layout: layout,
        })
    }, [dispatch])

    if (!visible) {
        return (
            <div className='layoutController' style={{ height: 'auto' }}>
                <BsChevronDoubleRight className="itemIcon" onClick={() => setVisible(true)} />
            </div>)
    }

    return (
        <div className='layoutController'>
            <div className='controllerHead'>
                <div className="itemDescription">Cytoscape Controller</div>
                <div className="itemContent">
                    <BsChevronDoubleLeft className="itemIcon" onClick={() => setVisible(false)} />
                </div>
            </div>

            <div className='controllerItem'>
                <div className="itemDescription">change data</div>
                <div className="itemContent">
                    <Select
                        selectedOption={selectedData}
                        onChange={onDataSelectChange}
                        options={dataSelection}
                        placeholder="Choose an option"
                        empty="No options"
                    />
                </div>
            </div>

            <div className='controllerItem'>
                <div className="itemDescription">change layout</div>
                <div className="itemContent">
                    <Select
                        selectedOption={selectedLayout}
                        onChange={onLayoutSelectChange}
                        options={layoutSelection}
                    />
                </div>
            </div>
            <div className='controllerItem'>
                <div className="itemDescription">download image</div>
                <div className="itemContent">
                    <Button onClick={downLoad}>
                        Download
                    </Button>
                </div>
            </div>
            {/* <div className='controllerItem'>
                <div className="itemDescription">png</div>
                <div className="itemContent">
                    <img id="png-eg" />
                </div>
            </div>
            <div className='controllerItem'>
                <div className="itemDescription">jpg</div>
                <div className="itemContent">
                    <img id="jpg-eg" />
                </div>
            </div> */}
        </div>
    )
}

export default React.memo(CytoscapeController)