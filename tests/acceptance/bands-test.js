import { test } from 'qunit';
import moduleForAcceptance from 'rarwe/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bands');

test('Sort songs in various ways', function(assert) {
	server = new Pretender(function() {
		httpStubs.stubBands(this, [
		{
			id: 1,
			attributes: {
				name: 'Them Crooked Vultures',
			}
		}
		]);
		httpStubs.stubSongs(this, 1, [
		{
			id: 1,
			attributes: {
				title: 'Elephants',
				rating: 5
			}
		},
		{
			id: 2,
			attributes: {
				title: 'New Fang',
				rating: 4
			}
		},
		{
			id: 3,
			attributes: {
				title: 'Mind Eraser, No Chaser',
				rating: 4
			}
		},
		{
			id: 4,
			attributes: {
				title: 'Spinning in Daffodils',
				rating: 5
			}
		}
		]);
	});
	selectBand('Them Crooked Vultures');
	andThen(function() {
		assert.equal(currentURL(), '/bands/1/songs');
		assertTrimmedText(assert, '.song:first', 'Elephants', 'The first song is the highest ranked, first in the alphabet');
			assertTrimmedText(assert, '.song:last', 'New Fang', 'The last song is the lowest ranked, last in the alphabet');
			});
			click('button.sort-title-desc');
			andThen(function() {
				assert.equal(currentURL(), '/bands/1/songs?sort=titleDesc');
				assertTrimmedText(assert, '.song:first', 'Spinning in Daffodils',
					'The first song is the one that is the last in the alphabet');
				assertTrimmedText(assert, '.song:last', 'Elephants', 'The last song is the one that is the first in the alphabet');
				});
				click('button.sort-rating-asc');
				andThen(function() {
					assert.equal(currentURL(), '/bands/1/songs?sort=ratingAsc');
					assertTrimmedText(assert, '.song:first', 'Mind Eraser, No Chaser',
						'The first song is the lowest ranked, first in the alphabet');
					assertTrimmedText(assert, '.song:last', 'Spinning in Daffodils',
						'The last song is the highest ranked, last in the alphabet');
				});
			});
