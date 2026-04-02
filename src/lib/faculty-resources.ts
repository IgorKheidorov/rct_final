export type ResourceLink = { label: string; href: string }
export type ResourceGroup = { id: string; label: string; links: ResourceLink[] }

export const FACULTY_RESOURCE_GROUPS: ResourceGroup[] = [
  {
    id: 'departments',
    label: 'КАФЕДРЫ',
    links: [
      { label: 'Кафедра радиофизики и цифровых медиа технологий', href: '/faculty/departments/rdmt' },
      { label: 'Кафедра квантовой радиофизики и оптоэлектроники', href: '/faculty/departments/qro' },
      { label: 'Кафедра физической электроники и нанотехнологий', href: '/faculty/departments/physelnano' },
      { label: 'Кафедра информатики и компьютерных систем', href: '/faculty/departments/ics' },
      { label: 'Кафедра интеллектуальных систем', href: '/faculty/departments/kis' },
      { label: 'Кафедра телекоммуникаций и информационных технологий', href: '/faculty/departments/teleit' },
      { label: 'Кафедра системного анализа и компьютерного моделирования', href: '/faculty/departments/sacm' },
      { label: 'Кафедра физики и аэрокосмических технологий', href: '/faculty/departments/phaerotech' },
    ],
  },
  {
    id: 'personnel',
    label: 'ПЕРСОНАЛИИ',
    links: [
      { label: 'Сотрудники', href: '/faculty/staff' },
      { label: 'Деканат', href: '/faculty/administration' },
      { label: 'Совет факультета', href: '/faculty/council' },
      { label: 'Профсоюз РКТ', href: '/faculty/prof-rct' },
    ],
  },
  {
    id: 'info-resources',
    label: 'ИНФОРМАЦИОННЫЕ РЕСУРСЫ',
    links: [
      { label: 'Образовательный портал', href: 'https://edurfe.bsu.by/login/index.php' },
      { label: 'Нормативные документы для сотрудников', href: 'https://bsu.by/sotrudnikam/normativnye-dokumenty-dlya-sotrudnikov/pravila-vnutrennego-trudovogo-rasporyadka-bgu.php' },
      { label: 'Книга памяти', href: 'https://www.mintrud.gov.by/ru/kniga-pamyati-ru' },
    ],
  },
  {
    id: 'internal-orgs',
    label: 'ВНУТРЕННИЕ ОРГАНИЗАЦИИ',
    links: [
      { label: 'Профсоюз', href: '/faculty/prof-rct' },
    ],
  },
  {
    id: 'bsu-documents',
    label: 'НОРМАТИВНЫЕ ДОКУМЕНТЫ БГУ',
    links: [
      { label: 'Этический кодекс БГУ', href: 'https://drive.google.com/file/d/1b2HdnTKgMLoAZO1XnRR4vVNpcPj4oQ0q/view?usp=sharing' },
      { label: 'Правила внутреннего трудового распорядка БГУ', href: 'https://drive.google.com/file/d/1jgb4RDTeFs5VOImED6YUmjhek7hbqlOe/view?usp=sharing' },
      { label: 'Правила внутреннего распорядка для обучающихся БГУ', href: 'https://drive.google.com/file/d/1xXFDrxYaLWVb82TtPEsblvleKkhD_zVN/view?usp=sharing' },
      { label: 'Положение о пропускном режиме', href: 'https://drive.google.com/file/d/1fyRUW5mXobVSaiqOhiCawWhvqwala22R/view?usp=sharing' },
      { label: 'Коллективный договор БГУ', href: 'https://drive.google.com/file/d/1sKkbBhEMwgAn1DRPq5sCwuonzxKLYVfW/view?usp=sharing' },
      { label: 'Об оказании материальной помощи обучающимся', href: 'https://drive.google.com/file/d/1uvXhUjnr9EpVpXsWdSKu5OBPSy2MKQrV/view?usp=sharing' },
      { label: 'Об осуществлении образовательного процесса с ИКТ', href: 'https://drive.google.com/file/d/1ku_lmkt-Rvxfz_Xkcy0XrS902EVEUW9H/view?usp=sharing' },
      { label: 'Политика информационной безопасности БГУ', href: 'https://drive.google.com/file/d/1a6xjLacsqifq9pThhbxKr5UoIlT1ZazD/view?usp=sharing' },
      { label: 'Политика обработки персональных данных', href: 'https://drive.google.com/file/d/1uCAeWgBFDrG2BkCmnVUX3fQCAlb3GQvk/view?usp=sharing' },
      { label: 'Охрана труда', href: 'https://drive.google.com/drive/folders/13gtX6JNP64kJh3LZGMP4i0S5KMG_eAns?usp=sharing' },
    ],
  },
]
