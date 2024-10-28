const casteData = [
    { value: 'ashrafs', label: 'Ashrafs' },
    { value: 'ajlafs', label: 'Ajlafs' },
    { value: 'pasmandas', label: 'Pasmandas' },
    { value: 'sheikhs', label: 'Sheikhs' },
    { value: 'mughals', label: 'Mughals' },
    { value: 'syeds', label: 'Syeds' },
    { value: 'qureshis', label: 'Qureshis' },
    { value: 'pathans', label: 'Pathans' },
    { value: 'bohras', label: 'Bohras' },
    { value: 'memons', label: 'Memons' },
    { value: 'khojas', label: 'Khojas' },
    { value: 'rohillahs', label: 'Rohillas' },
    { value: 'siddiquis', label: 'Siddiquis' },
    { value: 'chishti', label: 'Chishti' },
    { value: 'jats', label: 'Jats' },
].sort((a, b) => a.label.localeCompare(b.label));

export default casteData;
