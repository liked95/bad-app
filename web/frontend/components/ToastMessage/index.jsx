import { Toast } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function ToastMessage({ toastContent, toastActive, setToastActive }) {

    const toastMarkup = toastActive ? (
        <Toast content={toastContent} onDismiss={() => setToastActive(false)} />
    ) : null;

    return toastMarkup
}


export default ToastMessage;