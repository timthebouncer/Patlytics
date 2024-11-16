import {Route, Routes as ReactRoutes} from "react-router-dom";
import {FC, lazy, Suspense} from 'react';
import Layout from "./layout/layout.tsx";

const Loading:FC=()=>{
    return <div>Loading...</div>
}

const HomePage = lazy(()=> import('./App.tsx'))
const RecordListPage = lazy(()=> import('./pages/Record/RecordList/Page'))
const RecordInfoPage = lazy(()=> import('./pages/Record/RecordInfo/Page'))

const Routes=()=>{

    return (
        <ReactRoutes>
            <Route
                path="/"
                element={
                    <Suspense fallback={<Loading />}>
                        <Layout>
                            <HomePage />
                        </Layout>
                    </Suspense>
                }
            />
            <Route
                path="/record"
                element={
                    <Suspense fallback={<Loading />}>
                        <Layout>
                            <RecordListPage />
                        </Layout>
                    </Suspense>
                }
            />
            <Route path="/record/:recordId"
                   element={
                       <Suspense fallback={<Loading />}>
                           <Layout>
                               <RecordInfoPage />
                           </Layout>
                       </Suspense>
                   }
            />
        </ReactRoutes>


    )

}

export {Routes}