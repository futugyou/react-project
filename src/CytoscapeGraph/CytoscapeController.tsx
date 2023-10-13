import './CytoscapeController.css'

import { useEffect, useState } from 'react'
import { useCytoscapeCore } from '@/CytoscapeGraph/CytoscapePanelContext'


import Select from "@cloudscape-design/components/select"
import Button from "@cloudscape-design/components/button"

import singleAccount from './data/singleAccount.json'
import singleAccountDuplicates from './data/singleAccountDuplicates.json'

const CytoscapeController = () => {
    const { cy } = useCytoscapeCore()
    const [selectedOption, setSelectedOption] = useState({ label: "fcose", value: "fcose" })
    const [dataOption, setDataOption] = useState(null)

    const onSelectChange = ({ detail }: any) => {
        setSelectedOption(detail.selectedOption)
        cy.layout({ name: detail.selectedOption.value }).run()
    }

    const onDataChange = ({ detail }: any) => {
        setDataOption(detail.selectedOption)
        const key: string = detail.selectedOption.value
        if (key == "aws-data-1") {
            cy.collection(singleAccount as any)
        }

        if (key == "aws-data-2") {
            cy.collection(singleAccountDuplicates as any)
        }
        cy.layout({ name: selectedOption.value }).run()
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

    return (
        <div className='layoutController'>
            <div className='controllerItem'>
                <div className="itemDescription">change data</div>
                <div className="itemContent">
                    <Select
                        selectedOption={dataOption}
                        onChange={onDataChange}
                        options={[
                            { label: "aws-data-1", value: "aws-data-1" },
                            { label: "aws-data-2", value: "aws-data-2" },
                        ]}
                        placeholder="Choose an option"
                        empty="No options"
                    />
                </div>
            </div>

            <div className='controllerItem'>
                <div className="itemDescription">change layout</div>
                <div className="itemContent">
                    <Select
                        selectedOption={selectedOption}
                        onChange={onSelectChange}
                        options={[
                            { label: "avsdf", value: "avsdf" },
                            { label: "euler", value: "euler" },
                            { label: "fcose", value: "fcose" },
                            { label: "random", value: "random" },
                            { label: "grid", value: "grid" },
                            { label: "circle", value: "circle" },
                            { label: "concentric", value: "concentric" },
                            { label: "cose", value: "cose" },
                        ]}
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