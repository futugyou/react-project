import { useEffect } from 'react'
import { useCytoscapeCore } from './CytoscapePanelContext'

const TestCom = () => {
    const cy = useCytoscapeCore()
    console.log(cy?.current?.elements()?.length)
    useEffect(() => {
        if (cy && cy.current) {
            console.log("useEffect: ", cy.current.elements().length)
        }
    }, [cy])
    return <div>1</div>
}

export default TestCom