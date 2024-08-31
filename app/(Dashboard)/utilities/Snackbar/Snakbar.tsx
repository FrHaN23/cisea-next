import awsSnbr from 'awesome-snackbar'

type Options = {
    position?: string
    theme?: string 
    iconSrc?: string
    style?: object
    actionText?:string
    onAction?: () => void
    waitForEvent?: boolean
    timeout?: number
    afterHide?: () => void
}
export default function Snackbar(message: string, isOk: boolean, options?: Options){
    if (isOk){
        if(!options){
            options = {style:
                {container: 
                    [['background-color', '#14ce36']], 
                    message:[['color', '#eee']]
                }}
        }
        return new awsSnbr(message, options)
    }
    if(!options){
        options = {style:
            {container: 
                [['background-color', 'red']], 
                message:[['color', '#eee']]
            }}
    }
    return new awsSnbr(message, options)
}