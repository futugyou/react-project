import { useEffect } from 'react'
import { useCytoscapeCore } from './CytoscapePanelContext'

const TestCom = () => {
    const { cy, setCy } = useCytoscapeCore()
    console.log(cy?.elements()?.length)
    useEffect(() => {
        if (cy) {
            console.log("useEffect: ", cy.elements().length)
        }
    }, [cy])
    return <div>1</div>
}

export default TestCom