import AxiosClient from "./axiosClient";
import {CancelToken} from 'axios';
class AxiosService{
    // private static _axiosClient : AxiosClient;

    static get(
        url : string,
        {
            success,
            failed,
            error,
            params,
            addToken,
            startPage,
        } :
        {
            success? : Function,
            failed? : Function,
            error? : Function,
            params?: Map<string, any>,
            addToken?: boolean,
            startPage?: Number,
        }
    ){
        AxiosClient._getInstance().get(
            url,
            (data : any) =>{
                if(data["Status"] == false){
                    failed!(data);
                } else{
                    success!(data);
                }
            },
            {
                params : params,
                errorCallBack : (errorMessage : any) =>{
                    error!(errorMessage);
                },
                addToken
            }
        );
    }


    static async  post(
        url : string,
        {
            data,
            formData,
            params,
            queryParams,
            success,
            failed,
            error,
            addToken,
            addFormEncode,
            addMultipartForm
        }
        :
        {
            data? : Record<string, any>
            formData? : FormData,
            params?: Map<string, any>,
            queryParams?: Map<string, any>,
            success? : Function,
            failed? : Function,
            error? : Function,
            addToken?: boolean,
            addFormEncode?: boolean,
            addMultipartForm?: boolean,
        },
        // addHeader : boolean 
    ){
        // const rsp = 
        await  AxiosClient._getInstance().post(
            url,
            (data : any) =>{
                if(data["Status"] == false){
                    failed!(data);
                } else{
                    success!(data);
                }
            },
            (): any => {},
            {
                data : data,
                formData : formData,
                params : params,
                queryParams : queryParams,
                errorCallBack : (errorMessage : any) =>{
                    error!(errorMessage);
                },
                addToken,
                addFormEncode : addFormEncode,
                addMultipartForm : addMultipartForm,
            },            
        );
    }

    static put(
        url : string,
        {
            formData,
            params, 
            queryParams,
            success,
            failed,
            error,
            token,
        } :
        {
            formData? : FormData,
            params? : Map<string, any>,
            queryParams? : Map<string, any>,
            success? :  Function,
            failed? : Function,
            error? : Function,
            token? : CancelToken,
        }
    ){
        AxiosClient._getInstance().put(
            url,
            (data : any) =>{
                if(data["Status"] == false){
                    failed!(data);
                } else{
                    success!(data);
                }
            },
            (): any => {},
            {
                formData : formData,
                params : params,
                queryParams : queryParams,
                errorCallBack : (errorMessage : any) =>{
                    error!(errorMessage);
                },
            },
        );
    }

    static delete(
        url : string,
        {
            params, 
            queryParams,
            success,
            failed,
            error,
            token,
        } :
        {
            params? : Map<string, any>,
            queryParams? : Map<string, any>,
            success? :  Function,
            failed? : Function,
            error? : Function,
            token? : CancelToken,
        }
    ){
        AxiosClient._getInstance().delete(
            url,
            (data : any) =>{
                if(data["Status"] == false){
                    failed!(data);
                } else{
                    success!(data);
                }
            },
            {
                params : params,
                errorCallBack : (errorMessage : any) =>{
                    error!(errorMessage);
                },
                token : token
            },
        );
    }


}



export default AxiosService;