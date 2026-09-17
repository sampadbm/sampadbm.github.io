# CV and resume grounding audit

Audited: 2026-09-16. Scope: every entry feeding `webcv/index.html` and
`webcv/resume.html`, including expandable descriptions. Shared YAML corrections
also reach the homepage. This is a provenance audit, **not a claim that every
personal accomplishment has been independently verified**.

## Evidence standard

- **Primary source:** the paper, conference organizer, institution, or patent office
  supports the specific claim identified below. It does not automatically establish
  every contribution, employment date, or performance number in that entry.
- **User confirmation:** directly supplied in this conversation.
- **Repository record:** present before this CV/resume revision. This establishes
  provenance only; it is not proof and may itself contain errors.
- **Unresolved:** no sufficient evidence, a source conflict, or an unavailable source.
  No inferred resolution is presented as fact.

The baseline is commit `21c6aab8e7def3a9bedea9555c506480410a7ccd`.
References below to **B:path** mean that exact revision, not the edited file. Read
one with `git show 21c6aab8:neve/<path>`. In particular,
**B:webcv/index.html** contains the previously hardcoded experience, education,
patent, awards, skills, and community claims. The new `data/cv.yml` is a migration
and summary of those claims, not an independent source.

## Corrections made

| Issue | Correction and basis |
|---|---|
| Assistant-authored shortened talk titles presented as titles | Removed every `short_title` and `short_venue` override. Both views use the same canonical title, role/program name, and talk venue. The forest-safety talk again uses the exact title from B:data/talks.yml. This restores the record; it does not independently verify the event. |
| ML4DS service entry | Replaced with ML4PS for 2025 and added 2026, as explicitly confirmed by the user. The official annual pages support the workshop identity. The 2026 event is independent and co-located with NeurIPS, not an affiliated NeurIPS workshop. |
| LEAP author name/order | Corrected to Karajagi, Mohanty, Krishnamachari; retained the first two authors' equal-contribution designation. The paper's author block and footnote establish these facts. The old misspelling/order were already in the baseline. |
| COMSNETS authors | Restored P. M. Hiremath, omitted in the baseline. Author order follows the author-hosted paper, rather than a differently ordered bibliographic index. |
| Other author names | Expanded the camera paper's Chaitanya/Singh initials and restored Rithesh R. N. in the ICIIP citation, using the coauthor's institutional publication list and the organizer's award page. |
| SMILE publication type/title | Restored the conference title prefix “Poster Abstract:” from the official IPSN 2023 program. The linked arXiv version uses the shorter title. |
| Bosch factory attribution | Replaced Bosch with Vinyas Innovative Technologies. Bosch is part of the research center's name; the COMSNETS paper identifies Vinyas as the industrial partner. |
| Balloon altitude | User confirmed 20 km in a follow-up. Both detailed and short descriptions now use 20 km as the flight altitude. This resolves the baseline's conflicting 20 km and 2 km figures; the assistant's earlier reinterpretation as a **design** altitude had no source. |
| Mine role/paper chronology | User confirmed that the mine paper was earlier work. Both descriptions now explicitly identify it as earlier work published at ICMOCE 2015, separate from the June–July 2016 appointment. The user's approximate recollection of the research period is not converted into a new exact date range. |
| GM performance numbers | Removed 97% accuracy, 250× fewer parameters, and 5+ cities pending a report defining the metric, comparison, and dataset scope. These numbers came from the baseline, not a checked experiment. |
| Traffic-imputation numerical/context claims | Removed the 2–10% / 18–98% information-loss claim, grid dimensions, universal novelty claim, and blanket superiority wording. The checked SATORIS-N paper describes different missingness figures and daily matrix dimensions. It cannot substantiate those earlier combined-project claims. |
| Intrusion-detection scope | Replaced “developed novel” chirplet algorithms with comparison wording; removed unsubstantiated commercial-system superiority and robust 24/7 claims. Distinguished LITE's optical-camera/SBC system from the separate camera/PIR complement study. Counted papers and demo contributions without asserting that every item is a full peer-reviewed paper. |
| Short-description changes in meaning | Removed the unsupported six-week conversion of “one-and-a-half-month”; preserved Vanderbilt **admission** and addition of a second major without implying graduation or causation; restored “practice exams”; changed environmental/industrial pilots to the recorded industrial pilots; restored “conducted” tutorials and “organized” workshops. |
| Promotional/ranking claims | Removed “companies are now leaders” and the unsubstantiated NEST percentile/test-taker denominator. Kept the recorded employment and rank themselves, with the evidence limits below. |

## Research and industry: all 12 entries

Project dates, individual responsibilities, advisors, and employment titles below
remain repository records unless a narrower verification is explicitly stated.
Coauthorship does not establish sole responsibility for a system or experiment.

Following the user's 2026-09-17 clarification, the first six research entries
(`adam-convergence` through `task-allocation`) share the resume heading
University of Southern California. This institution grouping is supplied through
the existing YAML `resume_group` field; the IISc and NIT Rourkela groups follow it.

| Entry (`data/cv.yml` ID) | Provenance and limits |
|---|---|
| `adam-convergence` | B:data/research.yml; [preprint](https://arxiv.org/abs/2607.03519). Title, author order, year, and counterexamples for projected Adam in online optimization are supported. Wording preserves **can**, the online setting, and moment parameters in [0,1). |
| `optimizer-comparison` | B:webcv/index.html, lines 217–239; B:data/research.yml. Algorithms, four hybrids, datasets, experiment dates, and mentoring connections are repository records. The [EGGROLL project](https://eshyperscale.github.io/) and [Neural Thickets paper](https://arxiv.org/abs/2603.12228) support the referenced research, not execution of Sampad's experiments. |
| `llm-safety` | B:webcv/index.html, lines 241–265; B:data/research.yml. Amazon collaboration, models, probes, steering experiments, and dates are repository records. Retained investigatory wording; no assertion of successful safety localization or measured improvement. |
| `leap` | B:webcv/index.html, lines 267–285; [paper](https://arxiv.org/html/2601.22534v1); [project repository](https://github.com/neveisa/leap). Paper supports collaborative remote functions, logging, example labs, and publication identity. **LEAP2** languages, DuckDB isolation, CLI, rate limits, hot reload, and registry remain repository-record claims; the checked paper describes Python and future language support. It also describes the genetic-algorithm lab as planned. Later implementation needs a specific LEAP2 code revision. |
| `tensor-imputation` | B:webcv/index.html, lines 287–304; [SATORIS-N paper](https://arxiv.org/html/2602.03138v1). Subspace-informed nuclear-norm recovery and Beijing/Shanghai experiments are supported. The paper uses daily matrices of 340×24 and 320×24 and evaluates missingness up to 90%. SATORIS's KSV/KTF/USV/UTF details and IEEE Access status remain repository records. IV 2026 is corroborated by [DBLP](https://dblp.org/pid/346/2201.html), a secondary index; its publisher link was inaccessible during this audit. |
| `task-allocation` | B:webcv/index.html, lines 306–316. HEFT, MoHEFT, BPSO, genetic algorithms, DAG scheduling objectives, and 2020–2021 dates are repository records; no experiment artifact independently checked. |
| `bosch` | B:webcv/index.html, lines 318–346; [IOTAIS paper](https://ece.iisc.ac.in/~rajeshs/reprints/201811IOTAIS_KarEtAl.pdf); [COMSNETS paper](https://ece.iisc.ac.in/~rajeshs/reprints/202001COMSNETS_BhaEtAl.pdf). Papers support the joint sensor/data/simulation work and Vinyas attribution. Three months of continuous collection, personal task allocation, appointment dates, and tutorial delivery remain repository records. |
| `intrusion-detection` | B:webcv/index.html, lines 348–371; [coauthor's institutional publication list](https://ece.iisc.ac.in/~pvkece/publications.html); [coauthor CV](https://ece.iisc.ac.in/~pvkece/pdfs/PVK_BIO_2025.pdf); [LCN demo program](https://www.ieeelcn.org/prior/LCN42/Program_demos.html); [ICIIP awards](https://www.juit.ac.in/ICIIP_2017/bestpaper.php). These support the listed outputs. Personal implementation details, <5 W specification, exact employment dates, forest-department collaboration, and personal demo presentation remain repository records. |
| `mine-monitoring` | B:webcv/index.html, lines 373–388; B:data/profile.yml. The [NIT institutional catalog](https://dspace.nitrkl.ac.in/dspace/browse?etal=40&null=&offset=1826&order=ASC&rpp=25&sort_by=1&type=title) lists the five authors and December 2015 paper. The June–July 2016 appointment and ZigBee/SBC duties are repository records. The catalog was available through indexed text; direct access failed. User subsequently confirmed that the paper represents earlier work, resolving its relationship to the appointment. |
| `balloon-satellite` | B:webcv/index.html, lines 390–410. Dates, sensing, telemetry, storage, test launches, recovery, symposium, particulate sensors, thermal-design range, and pollution-gradient work are repository records. User subsequently confirmed the flight altitude as 20 km. No launch report, calibration/thermal test, or symposium program was independently inspected; the altitude is grounded in user confirmation. |
| `gm` | B:webcv/index.html, lines 164–181. Employer, role, dates, CP/Tucker work, Uber Movement/Beijing data, topic modeling, and approximately 50% missing-data setting are repository records. No internship report or evaluation results independently checked. Removed the undefined performance/scope figures listed above. |
| `startups` | B:webcv/index.html, lines 184–209. Founding-member/lead role, dates, firmware, infrastructure, team leadership, and industrial pilots are repository records. This does **not** assert cofounder status. Public company histories are insufficient to establish Sampad's individual role. |

## Publications and patent: all 15 citation records

The patent appears in the publications data and patent section, but its full
citation is printed only once in the resume. No publication record was removed.
Source spelling and author order take precedence over presentation preferences.

| Citation | Source check |
|---|---|
| On the Convergence of Adam, Revisited | [arXiv](https://arxiv.org/abs/2607.03519): title, authors, 2026 preprint. |
| LEAP | [Author manuscript](https://arxiv.org/html/2601.22534v1): title, authors/order, equal contribution, SIGCSE TS 2026 and DOI. Poster designation also existed in the repository. [Local attendance certificate](../certificates/2026/ACM_SigCSE_TS2026.pdf) establishes attendance, not authorship or presentation. |
| SATORIS-N | [arXiv](https://arxiv.org/abs/2602.03138): title, authors, 2026. IV association has repository and secondary-index support as described above; publisher proceedings not independently inspected. |
| DISPATCH | [arXiv](https://arxiv.org/abs/2511.17915): full title, four authors/order, 2025 preprint. |
| SATORIS | B:data/publications.yml and B:data/research.yml only. Manuscript title, four authors, 2025 date, submission and current “under review” status require manuscript/submission evidence. No acceptance inferred. |
| US 12,468,292 | [USPTO grant record](https://patentsgazette.uspto.gov/week45/OG/html/1540-2/US12468292-20251111.html): title, ten inventors, patent number and November 2025 issue; Indian application 202241033679 is the priority application. No Indian grant claimed. |
| SMILE | [Official IPSN 2023 poster program](https://ipsn.acm.org/2023/accepted_postersdemos.html) and [preprint](https://arxiv.org/abs/2301.11450): authors, title, conference/year, poster-abstract type. |
| Industrial Internet of Things / SMT assembly line | [Author-hosted paper](https://ece.iisc.ac.in/~rajeshs/reprints/202001COMSNETS_BhaEtAl.pdf) and [coauthor institutional CV](https://ece.iisc.ac.in/~rajeshs/RajeshSundaresanCV.pdf): title, eleven authors/order, COMSNETS 2020. |
| Digital Twin / SMT-PCB assembly line | [Author-hosted paper](https://ece.iisc.ac.in/~rajeshs/reprints/201811IOTAIS_KarEtAl.pdf): title and six authors; [coauthor-hosted proceedings copy](https://nehakaranjkar.github.io/publications/Digital_Twin.pdf) identifies IOTAIS 2018. |
| Reduced-complexity, reduced-power camera system | [Institutional coauthor bibliography](https://ece.iisc.ac.in/~pvkece/publications.html): title, authors, ICACCI 2017; [coauthor CV](https://ece.iisc.ac.in/~pvkece/pdfs/PVK_BIO_2025.pdf) identifies VisionNet. Best-paper claim has baseline and [coauthor self-report](https://in.linkedin.com/in/lr-tarun-choubisa-0ba56152) support, not an inspected organizer award list. |
| Direction and gender classification | [ICIIP organizer award list](https://www.juit.ac.in/ICIIP_2017/bestpaper.php): title, all four authors, 2017 conference and overall Best Paper Award. |
| LITE | [Official LCN 2017 demo program](https://www.ieeelcn.org/prior/LCN42/Program_demos.html): title, six authors/order, demo status. Linked PDF returned a challenge page and was not inspected. |
| Comparing chirplet-based classification | [Institutional coauthor bibliography](https://ece.iisc.ac.in/~pvkece/publications.html): title, four authors/order and ICACCI 2017. |
| Optical-camera complement to PIR | [Institutional coauthor CV](https://ece.iisc.ac.in/~pvkece/pdfs/PVK_BIO_2025.pdf), bibliography item 30: title, seven authors and 2017 workshop. Not evidence for an unqualified 24/7 reliability claim. |
| Mine-process monitoring | [NIT catalog](https://dspace.nitrkl.ac.in/dspace/browse?etal=40&null=&offset=1826&order=ASC&rpp=25&sort_by=1&type=title): title, five authors/order, December 2015, via indexed text. ICMOCE venue is retained from the baseline and bibliographic search results; full proceedings paper not inspected. |

## Teaching: all eight appointment records

All descriptions were checked against B:data/teaching.yml. Existing semesters,
instructors, roles, course names and duties remain repository records; an official
course page alone does not establish a TA appointment. The common summary describes
work across appointments collectively, not duties performed in every course.

| Appointment | Evidence and limits |
|---|---|
| CSCI556, Teaching Assistant, Fall 2026 | User explicitly confirmed the appointment and instructor. [Instructor's course page](https://viterbi-web.usc.edu/~shanghua/teaching/Fall2026-556/index.html) confirms title, semester and Shang-Hua Teng, but lists the TA as TBA. No new duties invented. Direct fetch failed; indexed page text was available. |
| CS567, Teaching Assistant | B:data/teaching.yml: all six semesters and instructor mappings retained. 150+ students per semester is a repository claim, not a checked enrollment record. “Practice exams” preserved. |
| CS467, Head Teaching Assistant | B:data/teaching.yml: Fall 2025, instructor, sole-TA responsibility and duties. |
| CS570, Head Teaching Assistant | B:data/teaching.yml: Fall 2024, instructor and duties. Practice exams are not relabeled as ordinary course exams. |
| CS570, Teaching Assistant | B:data/teaching.yml: Summer 2022 and Spring 2023 with their instructor mappings. Kept separately from head-TA appointment. |
| CS360, Teaching Assistant | B:data/teaching.yml: Spring 2025, instructor and homework topics. |
| EE250, Head Teaching Assistant | B:data/teaching.yml: all four semesters, three named instructors and lab/tutorial duties. |
| MATH499, Volunteer Teaching Assistant | B:data/teaching.yml: Fall 2020, instructor, tutorials, guest lectures and mentoring. Volunteer status retained. |

## Mentoring: all four records

Source: B:data/mentoring.yml. No student admission/financial-aid records or private
student data were sought. These are repository records, not independent attestations.

| Program | Check |
|---|---|
| USC Young Researchers Program | Two high-school students, ARS/PI-ARS/Gymnasium, June–July 2026, poster. Removed the assistant's exact six-week conversion. |
| CAMS Engineering Design & Development | Technical Mentor and Judge, January–June 2025, robotics/aerospace work, two mentored students and presentations. Vanderbilt admission/full funding and MIT second major remain unverified personal records; no causation or degree completion implied. |
| USC SHINE | Summer 2022, two high-school students, dimensionality-reduction methods and poster. Acronym capitalization normalized without adding methods. |
| Viterbi Summer Institute | Summer 2022, two first-year undergraduates, evolutionary algorithms and Gymnasium/RL. |

## Talks: all seven records

Source: B:data/talks.yml. Exact canonical titles, venues, dates and presentation
types are retained. Searches did not establish authoritative event records for
these talks; a paper with the same title is **not** proof that a talk occurred.

| Date | Recorded talk/event |
|---|---|
| 2026-03-28 | LEAP; CCSC Southwestern lightning talk at UC Riverside |
| 2025-10-31 | SATORIS-N; USC ECE research-festival poster |
| 2025-09-24 | Matrix and Tensor Factorization and Approximations for Understanding Spatiotemporal Data; USC WiSE STEM Bytes |
| 2022-06-06 | Industrial IoT and Digital Twin; NIT Rourkela professional-development programme |
| 2021-12-29 | Hands on IoT Application Machine Learning; GTU training programme, Invited Expert |
| 2019-06-25 | Industrial Internet of Things Tutorial; IISc |
| 2017-08-19 | Low Power Camera based Intrusion Monitoring for early warning system for forest safety; NIT Rourkela IOT Workshop |

## Service: all four records

| Role | Source |
|---|---|
| ML4PS reviewer, 2026 | User confirmation for role; [official workshop](https://ml4physicalsciences.github.io/2026/) for name and independent/co-located status. |
| IEEE IV reviewer, 2026 | B:data/services.yml. No invitation or acknowledgement independently checked. |
| ML4PS reviewer, 2025 | User correction to B:data/services.yml; [official 2025 page](https://ml4physicalsciences.github.io/2025/) confirms name and NeurIPS affiliation, not individual reviewer identity. |
| IEEE Transactions on Vehicular Technology reviewer, 2022 | B:data/services.yml. No invitation or acknowledgement independently checked. |

## Awards: all seven records

Source for all original entries: B:webcv/index.html, lines 486–505.

| Award | Evidence and limits |
|---|---|
| VisionNet–ICACCI Best Paper, 2017 | Repository record and coauthor self-report linked above; organizer award documentation still needed. |
| ICIIP Best Paper, 2017 | [Organizer's award list](https://www.juit.ac.in/ICIIP_2017/bestpaper.php) confirms the overall award, title and team. |
| TIFR interview qualification, 2017 | Repository record; selection and 48-candidate count need the shortlist/notification. |
| Intel challenge Top 10, 2015 | [Organizer CIIE's announcement](https://medium.com/ciie/ifdic-finalists-rendezvous-with-the-president-6da24ba652b0) corroborates Phoenix Robotix/Aurassure's finalist status. Sampad's team role is a repository record. |
| NIT undergraduate research appreciation, 2015 | Repository record; award certificate not available. |
| Medhabruti, 2012–2014 | Repository record; award letters not available. |
| NEST AIR 95, 2011 | Repository record; scorecard not available. Removed derived percentile and approximately 100,000-test-taker claim pending evidence. |

## Profile, coursework, skills and community

| Coverage | Provenance and limits |
|---|---|
| Name, PhD-candidate title, affiliation, research hook, email and profile links | B:data/profile.yml. Research interests are self-description. No inference of degree completion. |
| Contact phone, location and website | B:webcv/index.html; user explicitly requested the `/neve` suffix. No inferred contact information. |
| USC education | B:data/profile.yml and B:webcv/index.html, lines 116–126: dates, expected December 2026 completion, GPA 3.59, advisor and lab. Personal records; transcript/candidacy record not independently checked. |
| NIT Rourkela education | Same sources, lines 129–139: dual degree, dates and GPAs 7.20/10 and 8.42/10. Personal records, not independently verified. |
| All 21 coursework records | B:data/coursework.yml, unchanged. Codes/titles retained: MATH647, MATH547, MATH541A, MATH501, MATH532, MATH574, MATH505A, MATH505B, MATH425A, MATH395, EE592, EE588, EE660, EE546, EE510, CSCI675, CSCI670, CSCI567, ISE632, PHYS438, PHY-760. No transcript or historical catalogs checked. |
| All five skill groups | B:webcv/index.html, lines 508–527. Programming, Data & ML, Web, Databases & analytics, Systems: only existing named tools migrated. No proficiency scores or credentials inferred. |
| USC Makers | B:webcv/index.html, lines 534–546. Mentor/member, 2019–2022, tutorials/workshops. Repository record; summary retains original verbs. |
| ImprovSC | B:webcv/index.html, lines 548–557. Member, 2024–Present, weekly session coordination. Repository record. |

## Evidence still needed

The balloon altitude and mine-paper chronology are resolved by user confirmation.
The most consequential open items are the GM evaluation and metric
definitions; the SATORIS manuscript and current submission status; and a specific
LEAP2 implementation revision. Event programs, award certificates, transcripts,
employment records and reviewer invitations would independently substantiate
the remaining personal records. A missing public search result is not evidence
that a personal accomplishment is false.

This audit does not validate later YAML changes automatically. For updates, keep
formal names and author order exact, attach the supporting source, and update
both detailed and short descriptions without adding specificity, stronger verbs,
causality, numerical conversions, or publication status absent from that source.

## Validation of the edited views

All YAML parses and JavaScript syntax/whitespace checks pass. Browser checks cover
entry retention (10 research, 2 industry, 15 citation records including the patent,
8 teaching appointments, 4 mentoring, 7 talks, 4 service, 7 awards, 21 courses,
5 skill groups, 2 education and 2 community entries), citation parity, both ML4PS
years, canonical titles/venues/roles and rejection of stale short-title overrides.
The homepage also displays the corrected service data. Automatic new-entry
inclusion and description fallbacks pass. No JavaScript exceptions or horizontal
overflow at 320/390 px in the CV/resume checks. The corrected resume exports to
four US-letter pages. These are rendering checks, not additional factual evidence.
