# current progress

## backend
- [X] create a backend framework for data storage for given models.
  - [X] follows mvc architecture
  - [X] use express
  - [X] migration and seeding support
  - [X] models defination
  - [X] use ORM: for database interface so datbase can be easily switch
- [X] added controller
  - [X] user and session
  - [X] payment refund
  - [X] subscription and payment subscription
  - [X] analytics
	- [X] remining things are create more routes to show funnel and matrix.

## frontend

- [X] react initate
  - [X] create a session transfer button for experiment as login/logout is not in scope
  - [X] create pages for data showign for
	- users
    	- payment
	- analytics
  - [X] connect them with api calls
  - [X] using Redux to store session in in memory as localstorage is not safe due to xss attac or needs full flaged authentication system for cookies
- [X] remaining
  - [X] funnel and matrix to show analysis 
 
## what i did, after 11:00
- fix: refreshing probleam in frontend when unauthorised people is tring to get information
- fix: sqllite is not properly working with pnpm


