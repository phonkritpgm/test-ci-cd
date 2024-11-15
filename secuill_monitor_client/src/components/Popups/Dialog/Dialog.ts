import styles from './Dialog.module.css'
import errorIcon from '../../../assets/svgIconMessage/error.svg'
import questionIcon from '../../../assets/svgIconMessage/question.svg'
import infoIcon from '../../../assets/svgIconMessage/info.svg'
import successIcon from '../../../assets/svgIconMessage/success.svg'
import warningIcon from '../../../assets/svgIconMessage/warning.svg'

export enum buttonType{
    None,
    OK,
    YesNo,
}

export enum messageType{
    Success,
    Error,
    Warning,
    Info,
    Question,
}
class Dialog{

    public async open(eventHandler: (e: any) => void, message: string, title: string, btnType: buttonType, msgType: messageType){
        const resultContent = this.createDesignPopup(eventHandler
                                                    , (title == undefined || title == "") ? "" : title
                                                    , btnType
                                                    , msgType
                                                    , (btnType == buttonType.None || btnType == buttonType.OK) ? true : false
                                                    );
            // add content
        resultContent.innerHTML = message;
        return eventHandler;
    }

    private removeDialogMain(parent: any){
        if(parent == undefined) return;
        const allDialog = parent.querySelectorAll("#nm_dialog");
        for (let index = 0; index < allDialog.length; index++) {
            const element = allDialog[index];
            parent.removeChild(element);          
        }
    }

    public forceCloseDialog(){
        const mainBody = document.getElementsByTagName("body")[0];
        const allDialog = mainBody.querySelectorAll("#nm_dialog");
        for (let index = 0; index < allDialog.length; index++) {
            const element = allDialog[index];
            mainBody.removeChild(element);          
        }
    }

    private createDesignPopup(closeHandler: (e: any) => void, txtTitle: string, btnType: buttonType, msgType: messageType, bgClose: boolean){
        const getBodyMain = document.getElementsByTagName("body");

        const dialogContainerOverlay = document.createElement("div");
        const dialogContainer = document.createElement("div");
        const title = document.createElement("p");      
        const content = document.createElement("div");
        const footer = document.createElement("div");
    
        dialogContainerOverlay.id = "nm_dialog";

        dialogContainerOverlay.style.visibility = "visible";
        dialogContainerOverlay.style.opacity = "1";
        dialogContainerOverlay.className = styles.nm_popup_overlay;

        dialogContainer.className = styles.nm_popup;
        
        content.className = styles.content;
        footer.className = styles.footer;

        // add image
        const img_container = document.createElement("div");
        const img = document.createElement("img");
        img_container.appendChild(img);
        img_container.className = styles.img_container
        img.className = styles.img_icon
        switch (msgType) {
            case messageType.Success:
                img.src = successIcon;
            break;
            case messageType.Error:
                img.src = errorIcon;
            break;
            case messageType.Warning:
                img.src = warningIcon;
            break;
            case messageType.Info:
                img.src = infoIcon;
            break;
            case messageType.Question:
                img.src = questionIcon;
            break;
        }
    
        // append button in footer
        if( btnType == buttonType.None || btnType == buttonType.OK ){
            const btnOK = document.createElement("button");
            btnOK.className = styles.btn_ok;
            btnOK.value = "OK";
            btnOK.innerHTML = "OK";
            btnOK.addEventListener("click", (e) => closeHandler( Object.assign(e, {eventMessage: "ok"}), ))
            btnOK.addEventListener("click", () => { this.removeDialogMain(getBodyMain[0])});
            footer.appendChild(btnOK);

        } else if( btnType == buttonType.YesNo ){
            const btnYes = document.createElement("button");
            btnYes.className = styles.btn_yes;
            btnYes.value = "YES";
            btnYes.innerHTML = "YES";
            btnYes.addEventListener("click", (e) => closeHandler( Object.assign(e, {eventMessage: "yes"}), ))
            btnYes.addEventListener("click", () => { this.removeDialogMain(getBodyMain[0])});
            btnYes.focus();
            footer.appendChild(btnYes);

            const btnNo = document.createElement("button");
            btnNo.className = styles.btn_no;
            btnNo.value = "NO";
            btnNo.innerHTML = "NO";
            btnNo.addEventListener("click", (e) => closeHandler( Object.assign(e, {eventMessage: "no"}), ))
            btnNo.addEventListener("click", () => { this.removeDialogMain(getBodyMain[0])});
            footer.appendChild(btnNo);
        }

        // process
        title.innerHTML = txtTitle;

        if(bgClose == true){
            const spanClose = document.createElement("span");
            spanClose.className = styles.close;
            spanClose.innerHTML = "&times";
            spanClose.addEventListener("click", (e) => closeHandler( Object.assign(e, {eventMessage: "exit"}), ))
            spanClose.addEventListener("click", () => { this.removeDialogMain(getBodyMain[0])});
            dialogContainer.appendChild(spanClose);
        }

        // manage dialog design
        dialogContainer.appendChild(title);
        const hr = document.createElement("hr");
        dialogContainer.appendChild(hr);

        // div container
        dialogContainer.appendChild(img_container);
        dialogContainer.appendChild(content);
        dialogContainer.appendChild(footer);

        // add child to container
        dialogContainerOverlay.appendChild(dialogContainer);

        // add dialog to body main
        getBodyMain[0].appendChild(dialogContainerOverlay);

        return content;
    }

}

export default new Dialog;