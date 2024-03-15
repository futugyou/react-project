import { BoardProps } from "@cloudscape-design/board-components/board";
import { BoardItemProps } from "@cloudscape-design/board-components/board-item";
import { DateRangePickerProps } from "@cloudscape-design/components/date-range-picker";
import { ReactNode } from "react";

const formatRelativeRange = (range: DateRangePickerProps.RelativeValue): string => {
    const unit = range.amount === 1 ? range.unit : `${range.unit}s`
    return `Previous ${range.amount} ${unit}`
}

export const dateRangeI18nStrings: DateRangePickerProps['i18nStrings'] = {
    ariaLabel: 'Filter by a date and time range',
    todayAriaLabel: 'Today',
    nextMonthAriaLabel: 'Next month',
    previousMonthAriaLabel: 'Previous month',
    customRelativeRangeDurationLabel: 'Duration',
    customRelativeRangeDurationPlaceholder: 'Enter duration',
    customRelativeRangeOptionLabel: 'Custom range',
    customRelativeRangeOptionDescription: 'Set a custom range in the past',
    customRelativeRangeUnitLabel: 'Unit of time',
    formatRelativeRange: formatRelativeRange,
    formatUnit: (unit, value) => (value === 1 ? unit : `${unit}s`),
    dateTimeConstraintText: "For date, use YYYY/MM/DD hh:mm:ss",
    modeSelectionLabel: 'Date range mode',
    relativeModeTitle: 'Relative range',
    absoluteModeTitle: 'Absolute range',
    relativeRangeSelectionHeading: 'Choose a range',
    startDateLabel: 'Start date',
    endDateLabel: 'End date',
    startTimeLabel: 'Start time',
    endTimeLabel: 'End time',
    clearButtonLabel: 'Clear and dismiss',
    cancelButtonLabel: 'Cancel',
    applyButtonLabel: 'Apply',
    errorIconAriaLabel: 'Error',
    renderSelectedAbsoluteRangeAriaLive: (startDate, endDate) => `Range selected from ${startDate} to ${endDate}`,
}

export const dateRangeDateOnlyI18nStrings: DateRangePickerProps['i18nStrings'] = { ...dateRangeI18nStrings, dateTimeConstraintText: "For date, use YYYY/MM/DD", }

export const boardI18nStrings: BoardProps.I18nStrings<ItemData> = {
    liveAnnouncementDndStarted(operationType) {
        return operationType === "resize" ? "Resizing" : "Dragging";
    },
    liveAnnouncementDndItemReordered(op) {
        const columns = `column ${op.placement.x + 1}`;
        const rows = `row ${op.placement.y + 1}`;
        return createAnnouncement(
            `Item moved to ${op.direction === "horizontal" ? columns : rows}.`,
            op.conflicts,
            op.disturbed
        );
    },
    liveAnnouncementDndItemResized(op) {
        const columnsConstraint = op.isMinimalColumnsReached ? " (minimal)" : "";
        const rowsConstraint = op.isMinimalRowsReached ? " (minimal)" : "";
        const sizeAnnouncement =
            op.direction === "horizontal"
                ? `columns ${op.placement.width}${columnsConstraint}`
                : `rows ${op.placement.height}${rowsConstraint}`;
        return createAnnouncement(`Item resized to ${sizeAnnouncement}.`, op.conflicts, op.disturbed);
    },
    liveAnnouncementDndItemInserted(op) {
        const columns = `column ${op.placement.x + 1}`;
        const rows = `row ${op.placement.y + 1}`;
        return createAnnouncement(`Item inserted to ${columns}, ${rows}.`, op.conflicts, op.disturbed);
    },
    liveAnnouncementDndCommitted(operationType) {
        return `${operationType} committed`;
    },
    liveAnnouncementDndDiscarded(operationType) {
        return `${operationType} discarded`;
    },
    liveAnnouncementItemRemoved(op) {
        return createAnnouncement(`Removed item ${op.item.data.title}.`, [], op.disturbed);
    },
    navigationAriaLabel: "Board navigation",
    navigationAriaDescription: "Click on non-empty item to move focus over",
    navigationItemAriaLabel: (item) => (item ? item.data.title : "Empty"),
}

function createAnnouncement(
    operationAnnouncement: string,
    conflicts: readonly BoardProps.Item<ItemData>[],
    disturbed: readonly BoardProps.Item<ItemData>[]
) {
    const conflictsAnnouncement =
        conflicts.length > 0 ? `Conflicts with ${conflicts.map((c) => c.data.title).join(", ")}.` : "";
    const disturbedAnnouncement = disturbed.length > 0 ? `Disturbed ${disturbed.length} items.` : "";
    return [operationAnnouncement, conflictsAnnouncement, disturbedAnnouncement].filter(Boolean).join(" ");
}

export interface ItemData {
    title: string;
    description?: string;
    content: ReactNode;
    footer?: ReactNode;
    disableContentPaddings?: boolean;
}

export const boardItemI18nStrings: BoardItemProps.I18nStrings = {
    dragHandleAriaLabel: "Drag handle",
    dragHandleAriaDescription:
        "Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.",
    resizeHandleAriaLabel: "Resize handle",
    resizeHandleAriaDescription:
        "Use Space or Enter to activate resize, arrow keys to move, Space or Enter to submit, or Escape to discard.",
}