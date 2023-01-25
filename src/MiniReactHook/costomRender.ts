import ReactReconciler from "react-reconciler";

const hostConfig = {
    supportsMutation: true,
    getRootHostContext() {
        return {};
    },
    getChildHostContext() {
        return {};
    },
    prepareForCommit() {
        return true;
    },
    resetAfterCommit() { },
    shouldSetTextContent(_: any, props: { children: any; }) {
        return typeof props.children === 'string' || typeof props.children === 'number';
    },
    createInstance(type: any, newProps: { [x: string]: any; }, rootContainerInstance: any, _currentHostContext: any, workInProgress: any) {
        const domElement = document.createElement(type);
        Object.keys(newProps).forEach((propName) => {
            const propValue = newProps[propName];
            if (propName === "children") {
                if (typeof propValue === "string" || typeof propValue === "number") {
                    domElement.textContent = propValue;
                }
            } else if (propName === "onClick") {
                domElement.addEventListener("click", propValue);
            } else if (propName === "className") {
                domElement.setAttribute("class", propValue);
            } else {
                domElement.setAttribute(propName, propValue);
            }
        });
        return domElement;
    },
    createTextInstance(text: string) {
        return document.createTextNode(text);
    },
    appendInitialChild(parent: { appendChild: (arg0: any) => void; }, child: any) {
        parent.appendChild(child);
    },
    finalizeInitialChildren() { },
    clearContainer() { },
    appendChild(parent: { appendChild: (arg0: any) => void; }, child: any) {
        parent.appendChild(child);
    },
    appendChildToContainer(parent: { appendChild: (arg0: any) => void; }, child: any) {
        parent.appendChild(child);
    },
    prepareUpdate(domElement: any, oldProps: any, newProps: any) {
        return true;
    },
    commitUpdate(domElement: { textContent: string | number; setAttribute: (arg0: string, arg1: any) => void; }, updatePayload: any, type: any, oldProps: any, newProps: { [x: string]: any; }) {
        Object.keys(newProps).forEach((propName) => {
            const propValue = newProps[propName];
            if (propName === "children") {
                if (typeof propValue === "string" || typeof propValue === "number") {
                    domElement.textContent = propValue;
                }
            } else {
                domElement.setAttribute(propName, propValue);
            }
        });
    },
    commitTextUpdate(textInstance: { text: any; }, oldText: any, newText: any) {
        textInstance.text = newText;
    },
    removeChild(parentInstance: { removeChild: (arg0: any) => void; }, child: any) {
        parentInstance.removeChild(child);
    }
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

export default {
    render(reactElement: any, domElement: any, callback: any): any {
        // create root node
        if (!domElement._rootContainter) {
            domElement._rootContainter = ReactReconcilerInst.createContainer(domElement, false);
        }
        return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainter, null, callback);
    }
}