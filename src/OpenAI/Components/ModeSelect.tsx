

import { ColumnLayout, Popover, Box } from "@cloudscape-design/components"

import Dropdown, { DropdownItem } from "@/Common/Components/Dropdown"

const popover_text: string = "Choose the interface that best suits your task. You can provide: a simple prompt to complete, starting and ending text to insert a completion within, or some text with instructions to edit it."

const ModeSelect = (props: any) => {
    const mode = props.mode ?? 'Complete'
    const modes: string[] = ['Complete', 'Chat', 'Insert', 'Edit']

    const HandleModeChange = (value: string) => {
        if (props.onModeChange) {
            props.onModeChange(value)
        }
    }

    const selects: DropdownItem[] = modes.map(data => {
        return {
            key: data,
            value: data,
        }
    })

    return (
        <>
            <Box className="mb-3" >
                <ColumnLayout columns={1} borders="vertical">
                    <Popover
                        dismissButton={false}
                        content={
                            <span>{popover_text}</span>
                        }
                        position="left"                        
                        size="small"
                    >
                        <div>Mode</div>
                    </Popover>
                </ColumnLayout>
                <ColumnLayout columns={1} borders="vertical">
                    <Dropdown items={selects} onDropdownChange={HandleModeChange}></Dropdown>
                </ColumnLayout>
            </Box>
        </>
    )
}

export default ModeSelect