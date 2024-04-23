"use client"
import axios, { AxiosInstance, CancelToken, AxiosProgressEvent} from "axios";
// import Cookies from 'js-cookie';
// import LoginModel from "@/Models/LoginModel";

type ProgressCallback = (progressEvent: ProgressEvent) => void;

class AxiosClient {
    private _client: AxiosInstance;

    static _instance = new AxiosClient();

    GET = "GET";
    POST = "POST";
    PUT = "put";
    DELETE = "delete";
    PATCH = "patch";
    baseURL = 'http://localhost:3000/';

    static _getInstance(){
        return this._instance;
    }

    constructor() {
        this._client = axios.create({
            baseURL: this.baseURL,
            // You can add more configuration options here as needed
        });
    }

    getBaseUrl(){
        return this.baseURL;
    }

    // Method to perform GET requests
    async get(
        url: string,
        callBack: Function,
        {
            params,
            errorCallBack,
            addToken
        } :
        {
            params?: Map<string, any>,
            errorCallBack?: Function,
            addToken?: boolean
        }
    ){
        try {
            await this._request(
                url,
                callBack,
            {
                method: 'GET',
                params,
                errorCallBack,
                addToken
            });
        } catch (error) {
            throw error;
        }
    }

    // Method to perform POST requests
    async post(
        url: string,
        callBack: Function,
        progressCallBack: ProgressCallback,
        {
            data,
            formData,
            params,
            queryParams,
            errorCallBack,
            addToken,
            addFormEncode,
            addMultipartForm
        }: {
            data?: Record<string, any>;
            formData? : FormData;
            params?: Map<string, any>;
            queryParams?: Map<string, any>;
            errorCallBack?: Function;
            addToken?: boolean;
            addFormEncode? : boolean;
            addMultipartForm?: boolean;
        }
    ){
        try {
            // const result = 
            await this._request(
                url,
                callBack,
            {
                method: 'POST',
                params,
                queryParams,
                data,
                formData,
                errorCallBack,
                progressCallBack,
                addToken,
                addFormEncode,
                addMultipartForm,
            });
        } catch (error) {
            throw error;
        }
    }

    // Method to perform PUT requests
    async put(
        url: string,
        callBack: Function,
        progressCallBack: ProgressCallback,
        {
            formData,
            params,
            queryParams,
            errorCallBack,
            token,
        }: {
            formData?: FormData;
            params?: Map<string, any>;
            queryParams?: Map<string, any>;
            errorCallBack?: Function;
            token?: CancelToken;
        }
    ){
        try {
            await this._request(
                url,
                callBack,
            {
                method: 'PUT',
                params,
                queryParams,
                formData,
                errorCallBack,
                progressCallBack,
                // token,
            });
        } catch (error) {
            throw error;
        }
    }

    // Method to perform DELETE requests
    async delete(
        url: string,
        callBack: Function,
        {
            params,
            errorCallBack,
            token,
        }: {
            params?: Map<string, any>;
            errorCallBack?: Function;
            token?: CancelToken;
        }
    ){
        try {
            await this._request(
                url,
                callBack,
            {
                method: 'DELETE',
                params,
                errorCallBack,
                // token,
            });
        } catch (error) {
            throw error;
        }
    }

    private async _request(
        url : string,
        callBack : Function,
        {
            method,
            params,
            queryParams,
            data,
            formData,
            errorCallBack,
            progressCallBack,
            addToken,
            addFormEncode,
            addMultipartForm
        }: {
            method?: string;
            params?: Map<string, any>;
            queryParams?: Map<string, any>;
            data?: Record<string, any>;
            formData?:  FormData;
            errorCallBack?: Function;
            progressCallBack?: ProgressCallback;
            addToken?: boolean;
            addFormEncode?: boolean;
            addMultipartForm?: boolean;
        }): Promise<any>{
        try{
            // if(Cookies.get('LOGINDATA') != undefined && Cookies != null){
            //     const loginModel = new LoginModel({});
            //     const loginData = Cookies.get('LOGINDATA') ||'';
            //     loginModel.fromJson(loginData);
            //     this._client.defaults.headers.common["Authorization-Type"] =  `bearer ${loginModel.accessToken}`;
            // }

            if (addFormEncode) {
                console.log("inside addFormEncode")
                this._client.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
            }

            if(addMultipartForm){
                console.log("inside addMultiPart")
                this._client.defaults.headers.common["Content-Type"] = "multipart/form-data";
            }

            if(addToken){
                let token = window.localStorage.getItem("token");
                token = `Bearer ${token}`;
                this._client.defaults.headers.common['Authorization']=token;  
            }else{
                delete this._client.defaults.headers.common['Authorization'];  
            }
            var response;
            if(method == this.GET){
                if(params != null && params.size != 0){
                    response = await this._client.get(url, 
                        { 
                            params: params, 
                            // cancelToken: token, 
                        }
                    );
                    
                } else{
                    response = await this._client.get(
                        this.getBaseUrl() + url,
                        // {cancelToken: token}
                    );
                }
            } else if(method == this.POST){
                if (((params != null && params.size != 0)) || (queryParams != null && queryParams.size != 0) || (formData != null || data != null)) {
                    if(data != null){
                        console.log("inside if data not null")
                        response = await this._client!.post(
                            this.getBaseUrl() + url,
                            new URLSearchParams(data).toString(),
                        )
                    }
                    else if (formData != null) {
                        console.log("inside if formdata not null")
                        response = await this._client!.post(
                            this.getBaseUrl() + url,
                            formData,
                        );
                    }
                    // console.log("im inside paramas not ")
                    // response = await this._client!.post(
                    //             this.getBaseUrl() + url,
                    //             new URLSearchParams(data).toString(),
                    //         )
                    

                        // {
                        //     formData : formData ,
                        //     params : params,
                        //     queryParams : queryParams,
                        //     errorCallBack : errorCallBack,
                        //     token : token,
                        //     addHeader : false,
                        // }
                    // );
                } else {
                    response = await this._client!.post(
                        this.getBaseUrl() + url,
                        {
                            // token: token,
                        }
                    );
                }
            } else if(method == this.PUT){
                if ((params != null && params.size != 0) || (queryParams != null && queryParams.size != 0) || formData != null) {
                    response = await this._client!.put(
                        this.getBaseUrl() + url,
                        {
                            formData : formData ,
                            params : params,
                            queryParams : queryParams,
                            errorCallBack : errorCallBack,
                            // token : token,
                        }
                    );
                } else {
                    response = await this._client!.put(
                        this.getBaseUrl() + url,
                        {
                            // token: token,
                        }
                    );
                }
            } else if(method == this.DELETE){
                if ((params != null && params.size != 0) || (queryParams != null && queryParams.size != 0) || formData != null) {
                    response = await this._client!.delete(
                        this.getBaseUrl() + url,
                        {
                            params : params,
                            // cancelToken : token,
                        }
                    );
                } else {
                    response = await this._client!.delete(
                        this.getBaseUrl() + url,
                        {
                            // cancelToken: token,
                        }
                    );
                }
            } else if(method == this.PATCH){
                if ((params != null && params.size != 0) || (queryParams != null && queryParams.size != 0) || formData != null) {
                    response = await this._client!.patch(
                        this.getBaseUrl() + url,
                        {
                            formData : formData,
                            params : params,
                            progressCallBack : progressCallBack,
                            // token : token,
                        }
                    );
                } else {
                    response = await this._client!.patch(
                        this.getBaseUrl() + url,
                        {
                            // token: token,
                        }
                    );
                }
            } else{
                if(params != null && params.size != 0){
                    response = await this._client.get(url, { params: params,
                        //  cancelToken: token 
                        });
                    
                } else{
                    response = await this._client.get(
                        this.getBaseUrl() + url,
                        // {cancelToken: token}
                    );
                }

            }
            

            switch (response?.status) {
                case 200:
                    callBack(response.data);
                    // return response.data;
                    break;
                case 201:
                    callBack(response.data);
                    break;
                case 400:
                    callBack(response)
                    break;
                case 401:
                    // Cookies.remove("LOGINDATA");
                    this._handleError("Security Token expired. Retry login", errorCallBack);
                    break;
                case 403:
                case 404:
                case 409:
                    callBack(response)
                    break;
                case 500:
                case 503:
                default:
                    this._handleError("Unable to connect. Please try again later.", errorCallBack);
                    break;
            }

        } catch(error){
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // Cookies.remove("LOGINDATA");
                            // Handle unauthorized access
                            this._handleError("Security Token expired. Retry login", errorCallBack);
                            break;
                        case 400:
                            // return error.response.data;
                            callBack(error.response.data);
                            break;
                        case 403:
                            callBack(error.response.data);
                            break;
                        case 404:
                            callBack(error.response.data);
                            break;
                        case 405:
                            callBack(error.response.data);
                            break;
                        case 406:
                            callBack(error.response.data);
                            break;
                        case 409:
                            callBack(error.response.data);
                            break;
                        case 500:
                            console.log(error.response) 
                            callBack(error.response.data)
                        case 503:
                        default:
                            // Handle other server errors
                            this._handleError("Unable to connect. Please try again later.", errorCallBack);
                            break;
                    }
                } else {
                    // Handle other Axios errors
                    console.log(error)
                    this._handleError(error, errorCallBack);
                    // return error
                }
            } else {
                // Handle non-Axios errors
                this._handleError(error, errorCallBack);
            }
        }
    }

    private _handleError(error: any, errorCallBack?: Function) {
        // Handle errors based on your requirements
        if (errorCallBack) {
          errorCallBack(error);
        }
    }

}

export default AxiosClient;
