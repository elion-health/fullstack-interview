# Interviewer Guide: AI Research Assistant Challenge

## Overview

This 45-minute full-stack interview focuses on **problem-solving** and **architectural thinking** over speed. Tasks increase in complexity and include ambiguous product decisions that test the candidate's ability to reason about trade-offs.

**Theme**: Building features for Elion's AI-powered research assistant that helps health IT leaders discover and analyze research papers about the health tech landscape.

---

## Pre-Interview Setup

1. **Provide OpenAI API Key**: Give candidate an API key and ensure they add it to `.env.local`
2. **Verify Setup**: Have them run through the README setup steps
3. **Test Example**: Have them visit `/examples` to confirm everything works
4. **Set Expectations**:
   - 45 minutes total
   - Focus on problem-solving, not perfection
   - Ask clarifying questions when needed
   - Explain their reasoning for design decisions

---

## Task Levels (Progressive Difficulty)

### Level 1: Basic Research Paper Management (10-12 min)

**Objective**: Test fundamental full-stack skills and database modeling

#### Clear Requirements

Create a research papers management system:

1. Create a `Paper` entity with these fields:
   - `id` (primary key)
   - `title` (string)
   - `authors` (string)
   - `publishedDate` (Date)
   - `abstract` (text)
   - `url` (string, optional)
   - `createdAt`, `updatedAt` (timestamps)

2. Create and run a migration

3. Create an API endpoint `GET /api/papers` that returns all papers

4. Create a page at `/papers` that displays papers in a list/table

#### Ambiguous Product Challenge

**Ask**: "Health IT leaders need to quickly scan dozens of papers to find relevant ones. What information would you show in the list, and how would you organize it for quick scanning?"

**What to look for**:
- Do they think about information hierarchy?
- Do they consider visual design (truncation, emphasis, whitespace)?
- Do they ask about user context or usage patterns?
- Possible answers:
  - Show truncated abstracts
  - Highlight key metadata (date, publication)
  - Add visual indicators (tags, badges)
  - Consider card vs table layout
  - Add sorting/filtering hints

**Evaluation**:
- ✅ Entity created with proper decorators
- ✅ Migration created and run successfully
- ✅ API endpoint returns data correctly
- ✅ Frontend displays data (doesn't need to be perfect)
- ✅ **Reasoning about UX/product decisions**

---

### Level 2: AI-Powered Paper Summaries (12-15 min)

**Objective**: Test API integration, async operations, and UX thinking

#### Clear Requirements

Add AI summarization capability:

1. Add a `summary` field to the `Paper` entity (text, nullable)

2. Create migration for the schema change

3. Create an API endpoint `POST /api/papers/:id/summarize` that:
   - Takes a paper ID
   - Uses OpenAI to generate a summary from the abstract
   - Saves the summary to the database
   - Returns the summary

4. Add a "Generate Summary" button to the papers list

#### Ambiguous Product Challenges

**Ask them to consider**:

1. **"Summaries can take 5-15 seconds to generate. How should users experience this?"**
   - What to look for:
     - Loading states
     - Optimistic UI updates
     - Error handling
     - User feedback
     - Disable button during generation?

2. **"Should summaries be generated automatically when papers are added, or on-demand? What are the trade-offs?"**
   - What to look for:
     - Cost considerations (API costs)
     - Performance (page load time)
     - Flexibility (regeneration)
     - User control vs automation
     - Rate limits

3. **"What happens if the OpenAI API fails or the abstract is too long?"**
   - What to look for:
     - Error handling strategy
     - Fallback behavior
     - User messaging
     - Retry logic
     - Graceful degradation

**Evaluation**:
- ✅ Schema updated with migration
- ✅ API endpoint works with OpenAI
- ✅ Frontend triggers summarization
- ✅ **Thoughtful discussion of UX trade-offs**
- ✅ **Some error handling implemented**
- ⚠️ Don't expect perfect loading states (time constraint)

**Suggested OpenAI Prompt** (if they ask):
```
Summarize this research paper abstract in 2-3 concise sentences suitable for a busy healthcare IT executive.
```

---

### Level 3: Research Topic Collections (15-18 min)

**Objective**: Test relational data modeling and complex UX decisions

#### Clear Requirements

Allow organizing papers by health tech topics:

1. Create a `Topic` entity:
   - `id`, `name`, `description`, `createdAt`

2. Create a many-to-many relationship between `Paper` and `Topic`
   - Hint: Use MikroORM's `@ManyToMany` decorator

3. Create API endpoints:
   - `GET /api/topics` - List all topics
   - `POST /api/papers/:id/topics` - Add topic(s) to a paper
   - `GET /api/papers?topic=:id` - Filter papers by topic

4. Update the UI to show and filter by topics

#### Ambiguous Product Challenges

**Ask**: "Should users manually tag papers with topics, or should AI suggest topics automatically? Or both? Design your approach and explain the trade-offs."

**What to look for**:
- Do they recognize this as an AI/ML problem?
- Trade-off analysis:
  - **Manual tagging**: Accurate, time-consuming, human oversight
  - **Auto-tagging**: Fast, may have errors, needs review mechanism
  - **Hybrid**: Best of both, more complex UX
- Do they think about:
  - Topic taxonomy (predefined vs user-created)
  - Confidence scores for AI suggestions
  - Batch operations
  - Consistency across papers

**Follow-up questions**:
- "What if a paper doesn't fit any existing topic?"
- "How would you handle conflicting or overlapping topics?"
- "How would you validate AI-suggested topics before saving?"

**Evaluation**:
- ✅ Many-to-many relationship implemented correctly
- ✅ Can add topics to papers
- ✅ Can filter by topics
- ✅ **Strong reasoning about automation vs control**
- ✅ **Considers data quality and edge cases**
- ⚠️ UI can be basic (focus on logic and reasoning)

**MikroORM Hint** (if struggling):
```typescript
@ManyToMany(() => Topic, (topic) => topic.papers)
topics = new Collection<Topic>(this);
```

---

### Level 4: Smart Recommendations (Optional - If Time Permits)

**Objective**: Test creative problem-solving and system design thinking

#### Open-Ended Challenge

**Scenario**: "A health IT leader is researching 'patient data security'. They've viewed several papers on the topic. How would you recommend related papers to help them discover more relevant research?"

**What to look for**:

This is intentionally open-ended to see how they approach it:

1. **Simple approaches**:
   - Tag matching (papers with similar topics)
   - Keyword matching in titles/abstracts
   - Recently viewed papers

2. **Intermediate approaches**:
   - Authors who write about similar topics
   - Citation patterns (if that data existed)
   - Time-based relevance (recent papers weighted higher)

3. **Advanced approaches**:
   - AI embeddings (OpenAI embeddings API)
   - Semantic similarity
   - Collaborative filtering (what others viewed)
   - Hybrid scoring systems

**Questions to probe**:
- "What data would you need to make this work?"
- "How would you rank recommendations?"
- "How would you handle cold start (new users/papers)?"
- "What would 'good enough' look like vs the ideal solution?"

**Evaluation**:
- ✅ **Proposes a coherent approach**
- ✅ **Discusses trade-offs (complexity vs accuracy)**
- ✅ **Considers practical constraints** (time, data availability, cost)
- ⚠️ **Implementation not required** - focus on discussion and maybe pseudocode

---

## Evaluation Rubric

### Technical Skills (40%)

- **Database modeling**: Proper use of MikroORM decorators, relationships, migrations
- **API design**: RESTful endpoints, error handling, async operations
- **Frontend**: React patterns, state management, API integration
- **TypeScript**: Type safety, proper interfaces

### Problem-Solving (40%)

- **Analytical thinking**: Breaking down complex problems
- **Trade-off analysis**: Weighing different approaches
- **Edge case handling**: Thinking about error states and edge cases
- **Practical solutions**: Balancing ideal vs pragmatic

### Communication (20%)

- **Articulation**: Explaining reasoning clearly
- **Asking questions**: Clarifying ambiguous requirements
- **Collaboration**: Open to feedback and discussion

---

## Red Flags

- ❌ Doesn't create migrations for schema changes
- ❌ No error handling at all
- ❌ Can't explain their decisions
- ❌ Stuck and doesn't ask for help
- ❌ Focuses only on speed, ignores product thinking
- ❌ Doesn't test their code

## Green Flags

- ✅ Asks clarifying questions about product requirements
- ✅ Tests their API endpoints (Postman, curl, or browser)
- ✅ Discusses multiple approaches before implementing
- ✅ Admits when they don't know something and looks it up
- ✅ Thinks about the end user experience
- ✅ Considers cost and performance implications

---

## Interview Flow Suggestions

### First 5 minutes
- Warm-up and environment check
- Quick walkthrough of the codebase
- Explain the challenge structure
- Start Level 1

### Minutes 5-17
- Level 1 implementation and discussion
- Don't rush them through the ambiguous questions

### Minutes 17-32
- Level 2 implementation
- Spend time on the UX/trade-off discussions
- Probe their thinking

### Minutes 32-45
- Level 3 (and Level 4 if time)
- Focus more on discussion than perfect implementation
- If running short on time, can skip implementation and just discuss approach

### Last 2-3 minutes
- Ask if they have questions
- Provide feedback if appropriate

---

## Common Hiccups and Hints

### MikroORM Many-to-Many

Candidates may struggle with many-to-many. Hint them to:
```typescript
// In Paper entity
@ManyToMany(() => Topic, (topic) => topic.papers, { owner: true })
topics = new Collection<Topic>(this);

// In Topic entity
@ManyToMany(() => Paper, (paper) => paper.topics)
papers = new Collection<Paper>(this);
```

### OpenAI Streaming

If they want to implement streaming (impressive!), hint:
```typescript
const stream = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [...],
  stream: true,
});
```

### Loading States

If stuck on loading states, suggest:
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

---

## Post-Interview

### Discussion Topics

After completing tasks (or when time runs out), discuss:

1. "What would you do differently with more time?"
2. "What was the most challenging part?"
3. "How would you approach testing this code?"
4. "What would you need to make this production-ready?"

### Good Answers Might Include

- Add input validation
- Implement authentication
- Add caching for expensive operations
- Write unit and integration tests
- Add monitoring and logging
- Improve error messages
- Add pagination for large datasets
- Optimize database queries (eager loading, etc.)

---

## Scoring Notes

Remember: **Problem-solving is more important than completion**. A candidate who completes Level 1 and 2 thoughtfully with strong reasoning is better than someone who rushes through all levels with poor decisions.

Look for:
- Clear thinking
- Practical trade-off analysis
- User-centric design
- Technical competence
- Communication skills

Good luck with the interview!
