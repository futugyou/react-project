import './CytoscapeController.css'

import { useEffect, useState } from 'react'
import { useCytoscapeCore } from '@/CytoscapeGraph/CytoscapePanelContext'


import Select from "@cloudscape-design/components/select"
import Button from "@cloudscape-design/components/button"

import singleAccount from './data/singleAccount.json'
import singleAccountDuplicates from './data/singleAccountDuplicates.json'
import { useGetResourceGraph } from './useGetResourceGraph'
import { useAuth } from '@/Auth/index'
import { processElements } from './Processors/APIProcessors'

const CytoscapeController = () => {
    const { cy } = useCytoscapeCore()
    const { authService } = useAuth()

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


    const [awsconfigData, setAwsconfigData] = useState()
    const { data: nodeData, refetch: loadSelected, isLoading, isFetching, isError, status } = useGetResourceGraph({ enabled: !!authService.isAuthenticated() })

    const onLayoutSelectChange = ({ detail }: any) => {
        setSelectedLayout(detail.selectedOption)
        cy.layout({ name: detail.selectedOption.value }).run()
    }

    const onDataSelectChange = ({ detail }: any) => {
        setSelectedData(detail.selectedOption)
        const key: string = detail.selectedOption.value

        cy.elements().remove()

        if (key == "aws-data-1") {
            cy.add(singleAccount as any)
        }

        if (key == "aws-data-2") {
            cy.add(singleAccountDuplicates as any)
        }

        if (key == "aws-config") {
            cy.add(awsconfigData as any)
        }

        cy.layout({ name: selectedLayout.value }).run()
    }

    const downLoad = () => {
        if (cy) {
            cy.resize()
            const j = cy.json()
            console.log(j)
            var png64 = cy.png({ full: true })
            document.querySelector('#png-eg')!.setAttribute('src', png64)
            var jpg64 = cy.jpg({ full: true })
            document.querySelector('#jpg-eg')!.setAttribute('src', jpg64)
            downloadImage(png64, "graph.png")
            downloadImage(jpg64, "graph.jpg")
        }
    }

    const downloadImage = (dataUrl: string, name: string) => {
        const a = document.createElement('a')
        a.setAttribute('download', name)
        a.setAttribute('href', dataUrl)
        a.click()
    }

    useEffect(() => {
        if (nodeData && !isError) {
            const data = processElements(nodeData)
            const nodes = data.filter(p => p.group == "nodes")
            const edges = data.filter(p => p.group == "edges"
                && nodes.findIndex(a => a.data.id == p.data.source) >= 0
                && nodes.findIndex(a => a.data.id == p.data.target) >= 0)
            const d = nodes.concat(edges)
            console.log(d)
            setAwsconfigData(d as any)
            if (dataSelection.findIndex(p => p.value == 'aws-config') == -1) {
                const s = dataSelection.concat({ label: "aws-config", value: "aws-config" })
                setDataSelection(s)
            }
        }
        if (isError || !!!nodeData) {
            const index = dataSelection.findIndex(p => p.value == 'aws-config')
            if (index > -1) {
                const s = dataSelection
                s.splice(index, 1)
                setDataSelection(s)
            }
        }
    }, [nodeData, isError])
    return (
        <div className='layoutController'>
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
            <div className='controllerItem'>
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
            </div>
        </div>
    )
}

export default CytoscapeController