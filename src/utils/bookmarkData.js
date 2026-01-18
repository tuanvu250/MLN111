
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';
import img9 from '../assets/9.png';
import img10 from '../assets/10.png';
import img11 from '../assets/11.png';
import img12 from '../assets/12.png';

// Mapping rules:
// Bookmark 1-5: Front = 2, 3, 4, 5, 6. Back = 1.
// Bookmark 6-10: Front = 8, 9, 10, 11, 12. Back = 7.

export const getBookmarkData = (id) => {
    const numericId = parseInt(id, 10);

    if (numericId >= 1 && numericId <= 5) {
        // For IDs 1-5
        // ID 1 -> Front: img2 (index 1 + 1)
        // ID 2 -> Front: img3
        // ...
        // ID 5 -> Front: img6

        // Front image mapping:
        const frontImages = [null, img2, img3, img4, img5, img6]; // 1-based index for convenience

        return {
            id: numericId,
            front: frontImages[numericId],
            back: img1
        };
    } else if (numericId >= 6 && numericId <= 10) {
        // For IDs 6-10
        // ID 6 -> Front: img8
        // ID 7 -> Front: img9
        // ...
        // ID 10 -> Front: img12

        const offset = 6;
        const frontImages = [img8, img9, img10, img11, img12];

        return {
            id: numericId,
            front: frontImages[numericId - offset],
            back: img7
        };
    }

    // Default fallback if ID is out of range
    return {
        id: numericId,
        front: img2,
        back: img1
    };
};

export const getAllBookmarks = () => {
    return Array.from({ length: 10 }, (_, i) => getBookmarkData(i + 1));
};
