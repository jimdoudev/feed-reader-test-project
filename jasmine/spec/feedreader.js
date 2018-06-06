/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    /* This is the first test suite. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is the first test. It tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This is the second test. It tests to make sure that the
         * URLs are defined, are not empty and start with http(s)://.
         */
        it('have valid URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^(http|https):\/\//);
            });
        });

        /* This is the third test. It tests to make sure that the
         * Objects are defined,are not empty and that the names are
         * of type 'string'.
         */
        it('have valid names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                expect(typeof feed.name).toBe('string');
            });
        });

    });


    /* This is the second test suite. It is all about the menu
     * and its functionality.
     */
    describe('The menu', function() {
        // This test confirms that the menu is hidden by default.
        const body = document.body,
            menuIcon = document.querySelector('.icon-list');
        it('is hidden by default', function() {
            expect(body.className).toBe('menu-hidden');
        });
        /* Here we test the functionality of the menu button. It
         * should show the feed list by clicking on it and hide it
         * when clicked on again.
         */
        it('hides and appears on menu-icon click', function() {
            menuIcon.click();
            expect(body.className).not.toBe('menu-hidden');
            menuIcon.click();
            expect(body.className).toBe('menu-hidden');
        });
    });

    /* This is the third test suite. It tests the loadfeed function
     * and the initial entries.
     */
    describe('Initial Entries', function() {
        /* This test makes sure that once the loadfeed function is loaded,
         * at least one .entry element exists within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should consist of at least one .entry element', function(done) {
            const entries = document.querySelectorAll('.entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    /* This is the final test suite. It further examines the functionality
     * of the loadfeed function.
     */
    describe('New Feed Selection', function() {
        /* This test tests whether the loadfeed function actually
         * changes the content upon loading a new feed.
         */
        const feed = document.querySelector('.feed');
        let oldFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = feed.innerHTML;
                loadFeed(Math.floor((Math.random() * (allFeeds.length - 1)) + 1), function() {
                    done();
                });
            });
        });

        it('should actually change content, when loadfeed loads a new feed', function() {
            const newFeed = feed.innerHTML;
            expect(oldFeed).not.toBe(newFeed);
        });
    });
}());