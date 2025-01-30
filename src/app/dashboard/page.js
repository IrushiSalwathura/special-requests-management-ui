import Header from "@/components/Header";
import List from "@/components/List";

export default function Dashbaord({userType}){
    return (
        <>
            <Header name={'Irushi'}/>
            <section className="pt-20 px-10">
                <List />
            </section>
        </>
    );
}