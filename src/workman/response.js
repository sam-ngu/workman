export const response = {
    /**
     * 
     * @param {Event} event 
     * @param {Object} body 
     */
    async json(event, body){
        return event.respondWith(
            JSON.stringify(body)
        )
    },

    // form data
}