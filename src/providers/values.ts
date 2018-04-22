import { Injectable } from '@angular/core';

@Injectable()
export class Values {
    
    measurements : any;
    measurement_groups : any;
    location_groups: any;

    notifications: any = [
        {
            from: "j@4sound",
            subject: "Fender Event",
            time: 1803051030,
            message: `Gartner predicts that 50% of apps will be PWAs by 2020. That’s a major shift from where we are today.

            Why all the hype?
            
            Progressive Web Apps (PWAs) take advantage of major advances in web technology to deliver great app experiences to mobile and desktop users. Big brands like Twitter and Pinterest are demonstrating how PWAs can boost user acquisition, engagement, and ultimately, revenue. 
            
            To make sure you know when and how PWAs should be deployed as part of a broader app strategy, we put together a new paper: The Architect’s Guide to Progressive Web Apps.
            
            In this brief and practical guide, you’ll learn:
            
            Why PWAs matter. Trends and stories that underscore the need for PWAs.
            What makes a PWA. The key capabilities and features that define PWAs.
            How PWAs work. An overview of the APIs and browser standards that allow PWAs to provide reliable, fast, engaging experiences with the web.
            How PWAs fit into your app strategy. When and why to use a PWA in favor of a traditional native mobile app.
            How to get started. Everything you need to get started with PWAs today.
            Click here to download the guide.
            
            If you would like to discuss PWA development further we would love to talk strategy with you.
            
            Cheers,
            
            The Ionic Team`,
            checked: false
        },
        {
            from: "j@4sound",
            subject: "Gibson Event",
            time: 1803050940,
            message: `Dear Yuriy,
            Act fast! This job was posted less than five minutes ago, and we think it’s a good match for you. If you submit a proposal now, you’ll be one of the first candidates. You may even catch the client while they’re still online!
            -----------
            We’ll continue to send you freshly posted jobs we think are a good match with your profile and work history. Feel free to pursue them or search for more jobs.

            Regards,
            The Upwork team`,
            checked: false
        },
        {
            from: "gearbot@dearestgear.com",
            subject: "Temp Allert",
            time: 1803050940,
            message: `Hello!

            I'd like to invite you to apply to my job. Please review the job post and apply if you're available.
            
            Alexandre HELART`,
            checked: false
        }
    ];

    constructor() {
    }

}

