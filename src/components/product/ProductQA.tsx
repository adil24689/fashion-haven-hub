import { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronUp, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Question {
  id: string;
  question: string;
  author: string;
  date: string;
  answers: {
    id: string;
    answer: string;
    author: string;
    date: string;
    isOfficial: boolean;
  }[];
}

interface ProductQAProps {
  productName: string;
  questions?: Question[];
}

const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'Is this dress suitable for a formal wedding event?',
    author: 'Ayesha M.',
    date: '2024-01-12',
    answers: [
      {
        id: '1a',
        answer: 'Yes, this dress is perfect for formal occasions including weddings. The wrap style and maxi length make it elegant and appropriate for such events.',
        author: 'FashionHub Team',
        date: '2024-01-12',
        isOfficial: true,
      },
      {
        id: '1b',
        answer: 'I wore this to my cousin\'s wedding and received so many compliments! Highly recommend.',
        author: 'Fatima K.',
        date: '2024-01-13',
        isOfficial: false,
      },
    ],
  },
  {
    id: '2',
    question: 'Does the terracotta color look orange in person?',
    author: 'Samira R.',
    date: '2024-01-08',
    answers: [
      {
        id: '2a',
        answer: 'The terracotta color is a rich, earthy tone - more of a burnt orange/rust color rather than bright orange. It\'s exactly as shown in the photos.',
        author: 'FashionHub Team',
        date: '2024-01-08',
        isOfficial: true,
      },
    ],
  },
  {
    id: '3',
    question: 'Can this be machine washed or dry clean only?',
    author: 'Nadia S.',
    date: '2024-01-05',
    answers: [
      {
        id: '3a',
        answer: 'This dress can be machine washed on a cold, gentle cycle. However, for best results and longevity, we recommend hand washing or dry cleaning.',
        author: 'FashionHub Team',
        date: '2024-01-05',
        isOfficial: true,
      },
    ],
  },
];

export const ProductQA = ({ productName, questions = mockQuestions }: ProductQAProps) => {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([questions[0]?.id || '']);
  const [showAskForm, setShowAskForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) {
      toast.error('Please enter your question');
      return;
    }
    
    toast.success('Your question has been submitted! We\'ll respond within 24-48 hours.');
    setNewQuestion('');
    setShowAskForm(false);
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answers.some(a => a.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">Questions & Answers</h3>
          <p className="text-sm text-muted-foreground">
            Have a question about this product? Ask our community!
          </p>
        </div>
        <Button 
          className="btn-accent"
          onClick={() => setShowAskForm(!showAskForm)}
        >
          <MessageCircle size={16} className="mr-2" />
          Ask a Question
        </Button>
      </div>

      {/* Ask Form */}
      {showAskForm && (
        <div className="bg-secondary/50 rounded-lg p-4 space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Your Question</label>
            <Textarea
              placeholder={`Ask about ${productName}...`}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmitQuestion}>
              <Send size={14} className="mr-2" />
              Submit Question
            </Button>
            <Button variant="outline" onClick={() => setShowAskForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Search */}
      {questions.length > 3 && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleQuestion(q.id)}
              className="w-full flex items-start justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium bg-accent/20 text-accent px-2 py-0.5 rounded">
                    Q
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {q.author} • {new Date(q.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="font-medium">{q.question}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-sm text-muted-foreground">
                  {q.answers.length} {q.answers.length === 1 ? 'answer' : 'answers'}
                </span>
                {expandedQuestions.includes(q.id) ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
            </button>
            
            {expandedQuestions.includes(q.id) && q.answers.length > 0 && (
              <div className="border-t border-border bg-secondary/30">
                {q.answers.map((answer) => (
                  <div key={answer.id} className="p-4 border-b border-border last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded',
                        answer.isOfficial 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-muted text-muted-foreground'
                      )}>
                        A
                      </span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        {answer.author}
                        {answer.isOfficial && (
                          <CheckCircle size={12} className="text-accent" />
                        )}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        • {new Date(answer.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground pl-8">{answer.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            {searchQuery ? 'No questions match your search' : 'No questions yet. Be the first to ask!'}
          </p>
        </div>
      )}
    </div>
  );
};
