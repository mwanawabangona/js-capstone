import { createNewComment, getTotalComments } from '../comments.js';

test('Count comments', async () => {
  const initialComments = await getTotalComments(25);
  await createNewComment({
    item_id: 25,
    username: 'Chimwemwe ',
    comment: 'jest test',
  });
  const afterinitialComment = await getTotalComments(25);
  expect(initialComments).toBeLessThan(afterinitialComment);
});

test('Type of count is', async () => {
  const initialComments = await getTotalComments(25);
  expect(typeof initialComments).toBe('number');
});