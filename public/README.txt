Static files are held in this directory. 

Using express, the files can sent to the server
using 'app.use(express.static('directory_name'))'.

JavaScript:
	index.js (currently unused)
	start.js

HTML:
	index.html

CSS:
	index.css (currently unused)
	
@bug: Although the HTML file should not be held in this directory, I've encountered a bug in resolving the path of the file outside of this directory without ExpressJS considering the relative path malicious. For the time being, I have placed the file within the same directory as the static files. 

@IMPORTANT: index.js, index.css are not in use at the moment. I have instead used the contents of the two files in index.html until the bug has been resolved.
