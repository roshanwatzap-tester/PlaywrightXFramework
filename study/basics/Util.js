class Util 

{        
    constructor(page,link)
    {   
         this.page = page; 
         this.link = link; 

    }

    async Navigate()
    {
        await this.page.goto(this.link);

        return this.page; 

    }



}

module.exports= {Util}; 