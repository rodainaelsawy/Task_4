import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';

import AllPerks from '../src/pages/AllPerks.jsx';
import { renderWithRouter } from './utils/renderWithRouter.js';


  

describe('AllPerks page (Directory)', () => {
  test('lists public perks and responds to name filtering', async () => {
    // The seeded record gives us a deterministic expectation regardless of the
    // rest of the shared database contents.
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;

    // Render the exploration page so it performs its real HTTP fetch.
    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

    // Wait for the baseline card to appear which guarantees the asynchronous
    // fetch finished.
    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByText(/loading perks/i)).not.toBeInTheDocument();
    });

    // Now the perk should be visible
    expect(screen.getByText(seededPerk.title)).toBeInTheDocument();


    // Interact with the name filter input using the real value that
    // corresponds to the seeded record.
    const nameFilter = screen.getByPlaceholderText('Enter perk name...');
    fireEvent.change(nameFilter, { target: { value: seededPerk.title } });

    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByText(/loading perks/i)).not.toBeInTheDocument();
    });

    // Now the perk should be visible
    expect(screen.getByText(seededPerk.title)).toBeInTheDocument();


    // The summary text should continue to reflect the number of matching perks.
    expect(screen.getByText(/showing/i)).toHaveTextContent('Showing');
  });

  /*
  TODO: Test merchant filtering
  - use the seeded record
  - perform a real HTTP fetch.
  - wait for the fetch to finish
  - choose the record's merchant from the dropdown
  - verify the record is displayed
  - verify the summary text reflects the number of matching perks
  */

  test('lists public perks and responds to merchant filtering', async () => {
    // This will always fail until the TODO above is implemented.
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;

    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

    // Wait for initial fetch to finish
    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByText(/loading perks/i)).not.toBeInTheDocument();
    });

    // Now the perk should be visible
    expect(screen.getByText(seededPerk.title)).toBeInTheDocument();


    // Select merchant from dropdown
    const merchantDropdown = screen.getByRole('combobox');
    fireEvent.change(merchantDropdown, { target: { value: seededPerk.merchant } });

    // Wait for filtered results
    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByText(/loading perks/i)).not.toBeInTheDocument();
    });

    // Now the perk should be visible
    expect(screen.getByText(seededPerk.title)).toBeInTheDocument();


    // Summary text should reflect number of matching perks
    expect(screen.getByText(/showing/i)).toHaveTextContent('Showing');

  });
});
