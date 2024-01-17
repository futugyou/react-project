import { createPluginFactory, PlateRenderElementProps } from "@udecode/plate-common"

export const KEY_AMAZING = 'amazing'

export const createAmazingPlugin = createPluginFactory({
  key: KEY_AMAZING,
  isElement: true,
})

export const ParagraphElement = ({
    attributes,
    nodeProps,
    children,
  }: PlateRenderElementProps) => {
    return (
      <p {...attributes} {...nodeProps}>
        <div>This is amazing plugin.</div>
        {/* The `children` prop must always be rendered */}
        {children}
      </p>
    );
  };
  