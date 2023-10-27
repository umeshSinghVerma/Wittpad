import {defineConfig} from 'sanity';
import {deskTool } from 'sanity/desk';
const config = defineConfig({
    projectId:'lnxjx1v5',
    dataset:"production",
    title:"Wittpad",
    apiVersion:"2023-10-27",
    basePath:'/admin',
    plugins:[deskTool()]
})

export default config;