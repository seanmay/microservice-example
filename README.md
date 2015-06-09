Microservice Example
====================

> A horrible hack job of displaying just how simple it would be to create a series of microservices.  
> The microservices can all happily coexist (mostly-happily), on the same box, with the additional complexity of port management.
>
> That complexity is mitigated by a discovery service.  
> Each microservice, with the help of the discovery service, gets to be ignorant of all details regarding where to contact their dependencies.
> So long as each service is built expecting to speak over HTTP, to accomplish all secondary-objectives;
> the concurrency model which develops naturally, then lends itself to being spread across machines

>Each Microservice takes ~40MB of memory, and of course, will chew up its own process threads.
