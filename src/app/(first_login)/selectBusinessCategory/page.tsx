"use client"
import { useEffect, useState } from "react";
import { SelectGroup } from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/Buttons";
import AxiosService from "@/utils/axios/axiosService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function selectBusinessCategory() {

    const [selectedOption, setSelectedOption] = useState<string>("");
    const [selectedId, setSelectedId] = useState<number>();
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [options, setoptions] = useState<Array<{ id: number, name: string }>>([]);
    const router = useRouter();

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    const submitForm = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        // console.log(selectedId, selectedOption)
            let data = { bookingCategoryId: selectedId };
            AxiosService.post("admin/selectBusinessCategory/", {
                data: data,
                success: (data: any) => {
                    console.log("successfull", data);
                    toast.success("Successfull", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        // draggable: true,
                        progress: undefined
                    })
                    router.push('/dashboard')
                },
                failed: (data: any) => {
                    console.log("falied", data)
                    toast.error(data.msg, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        // draggable: true,
                    });
                },
                error: (data: any) => {
                    console.log("error", data)
                    toast.error(data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        // draggable: true,
                    });
                },
                addToken: true,
                addFormEncode : true
            },
                
            );
        }

        useEffect(() => {
            AxiosService.get('admin/getAllBusinessCategories', {
                success: (data: any) => {
                    // console.log(data)
                    const responseOptions = data.response.map((item: any) => {
                        return {
                            id: item.bookingCategoryId,
                            name: item.booking_category_name
                        }
                    })
                    setoptions(responseOptions);
                },
                failed: (data: any) => {
                    console.log("falied", data)
                },
                error: (data: any) => {
                    console.log("error occured", data)
                },
                addToken: true
            })
        }, []);

        return (
            <>
                <form onSubmit={submitForm}>
                    <div className="rounded-sm border w-2/3 sm:w-1/3 border-accent-100 bg-bkg-100 shadow-default p-4 mx-auto mt-20 shadow-md">
                        <SelectGroup
                            label={"choose category"}
                            options={options}
                            onChange={(e) => {
                                setSelectedOption(e.target.value);
                                setSelectedId(parseInt(e.target.options[e.target.selectedIndex].id))
                                changeTextColor();
                            }}
                            // setSelectedId = {setSelectedId}
                            value={selectedOption}
                            // selectedId={selectedId} 
                            isOptionSelected={isOptionSelected}
                            required={true}
                            
                        />

                        <SubmitButton
                            name="Submit"
                            onClick={() => { }}
                            disabled={false}
                        />
                    </div>

                </form>
            </>

        )
    }