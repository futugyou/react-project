import ReactReconciler from "react-reconciler";

const hostConfig = {};

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