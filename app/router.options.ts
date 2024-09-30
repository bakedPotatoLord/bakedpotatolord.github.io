import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {


        return (to.hash) ?
            {
                el: to.hash,
                behavior: 'smooth',
                top: 150,
            }
            :
            {
                top: 0,
                behavior: "smooth"
            }
    }
};