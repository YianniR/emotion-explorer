"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  RefreshCcw, 
  ArrowLeft,
  Sparkles,
  Wind,
  Waves,
  Flame,
  Cloud,
  Zap,
  Target,
  Clock
} from 'lucide-react';

export default function EmotionFinder() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matchedEmotions, setMatchedEmotions] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 'physical',
      text: "What physical sensations are you experiencing?",
      options: [
        { label: "Racing heart or heightened energy", value: "aroused" },
        { label: "Muscle tension or tightness", value: "tense" },
        { label: "Heaviness or slowness", value: "heavy" },
        { label: "Lightness or openness", value: "light" },
        { label: "Calm or neutral sensations", value: "neutral" }
      ]
    },
    {
      id: 'valence',
      text: "How would you describe the overall feeling?",
      options: [
        { label: "Clearly pleasant or uplifting", value: "positive" },
        { label: "Definitely unpleasant or difficult", value: "negative" },
        { label: "Both pleasant and unpleasant aspects", value: "mixed" },
        { label: "Neither pleasant nor unpleasant", value: "neutral" }
      ]
    },
    {
      id: 'energy',
      text: "What's your energy or activation level?",
      options: [
        { label: "Highly energized, almost electric", value: "very_high" },
        { label: "Actively engaged and alert", value: "high" },
        { label: "Balanced and present", value: "moderate" },
        { label: "Quiet and subdued", value: "low" },
        { label: "Very low or depleted", value: "very_low" }
      ]
    },
    {
      id: 'direction',
      text: "What triggered this feeling?",
      options: [
        { label: "Something about myself", value: "self" },
        { label: "My relationship with others", value: "others" },
        { label: "An external situation", value: "situation" },
        { label: "Thoughts about the future", value: "future" },
        { label: "Memories or past events", value: "past" }
      ]
    },
    {
      id: 'control',
      text: "How much control do you feel over this emotion?",
      options: [
        { label: "Completely in control", value: "high" },
        { label: "Mostly manageable", value: "moderate" },
        { label: "Somewhat overwhelming", value: "low" },
        { label: "Feeling overtaken by it", value: "very_low" }
      ]
    },
    {
      id: 'duration',
      text: "How long have you been feeling this way?",
      options: [
        { label: "Just in this moment", value: "moment" },
        { label: "Past few hours", value: "hours" },
        { label: "Several days", value: "days" },
        { label: "Weeks or longer", value: "chronic" }
      ]
    },
    {
      id: 'clarity',
      text: "How clear is this feeling to you?",
      options: [
        { label: "Very clear and specific", value: "very_clear" },
        { label: "Somewhat clear", value: "clear" },
        { label: "A bit confusing or mixed", value: "unclear" },
        { label: "Very unclear or complicated", value: "very_unclear" }
      ]
    },
    {
      id: 'impact',
      text: "How is this feeling affecting your behavior?",
      options: [
        { label: "Motivating action or engagement", value: "motivating" },
        { label: "Causing withdrawal or avoidance", value: "withdrawing" },
        { label: "Creating confusion or freeze", value: "freezing" },
        { label: "No significant impact", value: "neutral" }
      ]
    },
    {
      id: 'thoughts',
      text: "What kind of thoughts accompany this feeling?",
      options: [
        { label: "Focused and clear thoughts", value: "clear" },
        { label: "Racing or overwhelming thoughts", value: "racing" },
        { label: "Slow or foggy thinking", value: "foggy" },
        { label: "Repetitive or circular thoughts", value: "repetitive" }
      ]
    },
    {
      id: 'social',
      text: "How does this feeling affect your social connections?",
      options: [
        { label: "Want to connect with others", value: "connecting" },
        { label: "Need to be alone", value: "isolating" },
        { label: "Mixed feelings about people", value: "ambivalent" },
        { label: "No effect on social needs", value: "neutral" }
      ]
    },
    {
      id: 'intensity',
      text: "How intense is this feeling?",
      options: [
        { label: "Overwhelming intensity", value: "extreme" },
        { label: "Strong but manageable", value: "strong" },
        { label: "Moderately intense", value: "moderate" },
        { label: "Subtle or mild", value: "mild" }
      ]
    }
  ];
  
  const emotions = {
    joy: {
      name: "Joy",
      variations: ["delighted", "happy", "cheerful", "elated", "radiant", "jubilant"],
      conditions: {
        valence: ["positive"],
        energy: ["high", "moderate"],
        physical: ["light", "aroused"],
        impact: ["motivating"]
      },
      icon: "sparkles"
    },
    peace: {
      name: "Peace",
      variations: ["serene", "tranquil", "calm", "relaxed", "content", "harmonious"],
      conditions: {
        valence: ["positive", "neutral"],
        energy: ["low", "moderate"],
        physical: ["light", "neutral"],
        control: ["high", "moderate"]
      },
      icon: "wind"
    },
    love: {
      name: "Love",
      variations: ["affectionate", "caring", "warm", "tender", "compassionate", "connected"],
      conditions: {
        valence: ["positive"],
        direction: ["others"],
        social: ["connecting"],
        clarity: ["very_clear", "clear"]
      },
      icon: "heart"
    },
    excitement: {
      name: "Excitement",
      variations: ["thrilled", "eager", "animated", "energized", "enthusiastic", "alive"],
      conditions: {
        valence: ["positive"],
        energy: ["very_high", "high"],
        physical: ["aroused"],
        thoughts: ["clear", "racing"]
      },
      icon: "sparkles"
    },
    gratitude: {
      name: "Gratitude",
      variations: ["thankful", "appreciative", "blessed", "moved", "touched", "fortunate"],
      conditions: {
        valence: ["positive"],
        clarity: ["very_clear", "clear"],
        direction: ["others", "situation"]
      },
      icon: "heart"
    },
    anger: {
      name: "Anger",
      variations: ["frustrated", "irritated", "mad", "outraged", "resentful", "indignant"],
      conditions: {
        valence: ["negative"],
        energy: ["high"],
        physical: ["tense", "aroused"],
        control: ["low", "very_low"]
      },
      icon: "flame"
    },
    sadness: {
      name: "Sadness",
      variations: ["down", "blue", "heavy-hearted", "sorrowful", "grief", "melancholy"],
      conditions: {
        valence: ["negative"],
        energy: ["low", "very_low"],
        physical: ["heavy"],
        social: ["isolating"]
      },
      icon: "cloud"
    },
    anxiety: {
      name: "Anxiety",
      variations: ["worried", "uneasy", "nervous", "apprehensive", "restless", "tense"],
      conditions: {
        valence: ["negative"],
        energy: ["high", "moderate"],
        direction: ["future"],
        thoughts: ["racing", "repetitive"]
      },
      icon: "zap"
    },
    pride: {
      name: "Pride",
      variations: ["accomplished", "confident", "successful", "strong", "capable", "validated"],
      conditions: {
        valence: ["positive"],
        direction: ["self"],
        clarity: ["very_clear", "clear"],
        control: ["high"]
      },
      icon: "target"
    },
    fatigue: {
      name: "Fatigue",
      variations: ["tired", "drained", "exhausted", "depleted", "weary", "burned-out"],
      conditions: {
        energy: ["very_low", "low"],
        physical: ["heavy"],
        thoughts: ["foggy"]
      },
      icon: "clock"
    },
    overwhelm: {
      name: "Overwhelm",
      variations: ["stressed", "pressured", "swamped", "overloaded", "scattered", "frazzled"],
      conditions: {
        control: ["very_low"],
        thoughts: ["racing"],
        clarity: ["unclear", "very_unclear"],
        impact: ["freezing"]
      },
      icon: "zap"
    },
    contentment: {
      name: "Contentment",
      variations: ["satisfied", "fulfilled", "at-ease", "comfortable", "settled", "peaceful"],
      conditions: {
        valence: ["positive"],
        energy: ["moderate", "low"],
        control: ["high", "moderate"],
        clarity: ["clear"]
      },
      icon: "wind"
    }
  };

  const getEmotionIcon = (emotion) => {
    switch(emotion.toLowerCase()) {
      case 'joy':
        return <Sparkles className="w-5 h-5 text-yellow-500" />;
      case 'peace':
        return <Wind className="w-5 h-5 text-blue-400" />;
      case 'love':
        return <Heart className="w-5 h-5 text-pink-500" />;
      case 'anger':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'sadness':
        return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'anxiety':
        return <Zap className="w-5 h-5 text-purple-500" />;
      case 'pride':
        return <Target className="w-5 h-5 text-green-500" />;
      case 'fatigue':
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return <Waves className="w-5 h-5 text-blue-500" />;
    }
  };

  const calculateEmotionMatches = (currentAnswers) => {
    const matches = []; // instead of let matches = [];
    Object.entries(emotions).forEach(([_, emotion]) => {
      let score = 0;
      let maxScore = 0;
      
      Object.entries(emotion.conditions).forEach(([criterion, validValues]) => {
        if (currentAnswers[criterion]) {
          maxScore++;
          if (validValues.includes(currentAnswers[criterion])) {
            score++;
          }
        }
      });

      const matchScore = maxScore > 0 ? (score / maxScore) : 0;
      
      if (matchScore > 0.3) {
        const intensity = currentAnswers.intensity || "moderate";
        const variations = emotion.variations.map(v => 
          intensity === "high" ? `intensely ${v}` :
          intensity === "low" ? `slightly ${v}` : v
        );
        
        matches.push({
          ...emotion,
          variations,
          matchScore
        });
      }
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleAnswer = async (answer) => {
    setIsTransitioning(true);
    
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: answer
    };
    setAnswers(newAnswers);
    
    setMatchedEmotions(calculateEmotionMatches(newAnswers));
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
    
    setIsTransitioning(false);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setIsComplete(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setMatchedEmotions([]);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Emotion Explorer
          </h1>
          <p className="text-gray-600">Discover and understand your emotional landscape</p>
        </div>

        <div className="mb-6">
          <Progress 
            value={isComplete ? 100 : (currentQuestion / questions.length) * 100} 
            className="h-2 transition-all duration-500"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{isComplete ? "Complete!" : `Question ${currentQuestion + 1} of ${questions.length}`}</span>
            <span>{isComplete ? "100% Complete" : `${Math.round((currentQuestion / questions.length) * 100)}% Complete`}</span>
          </div>
        </div>

        {!isComplete ? (
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className={`mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text">
                  {questions[currentQuestion].text}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {questions[currentQuestion].options.map((option) => (
                    <Button
                      key={option.value}
                      variant={answers[questions[currentQuestion].id] === option.value ? "default" : "outline"}
                      className={`
                        w-full justify-start text-left h-auto py-4 px-6 rounded-xl
                        transition-all duration-200 transform hover:scale-102 hover:shadow-md
                        ${answers[questions[currentQuestion].id] === option.value ? 
                          'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : // selected state
                          'hover:bg-gray-50 text-gray-800' // unselected state
                        }
                      `}
                      onClick={() => handleAnswer(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t pt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      handleBack();
                      setIsTransitioning(false);
                    }, 300);
                  }}
                  disabled={currentQuestion === 0}
                  className="text-gray-800 hover:text-gray-800"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Your Emotional Landscape
                </h2>
                <p className="text-gray-600">
                  Based on your responses, here&apos;s a detailed view of what you might be feeling
                </p>
              </div>

              <div className="space-y-6">
                {matchedEmotions.map((emotion, index) => (
                  <div
                    key={emotion.name}
                    className={`
                      p-6 rounded-xl bg-white shadow-sm
                      transform transition-all duration-300 hover:scale-102
                      ${index === 0 ? 'ring-2 ring-blue-100' : ''}
                    `}
                  >
                    <div className="flex items-center mb-4">
                      {getEmotionIcon(emotion.name)}
                      <span className="text-xl text-gray-800 font-medium ml-2">{emotion.name}</span>
                      {index === 0 && (
                        <span className="ml-3 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                          Primary Emotion
                        </span>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-800 mb-2">How it might feel:</div>
                      <div className="flex flex-wrap gap-2">
                        {emotion.variations.map(variation => (
                          <span 
                            key={variation} 
                            className="px-3 py-1.5 text-gray-800 bg-gray-50 rounded-full text-sm
                                     transition-colors duration-200 hover:bg-gray-100"
                          >
                            {variation}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="bg-white"
                >
                  <RefreshCcw className="mr-2 text-gray-800 h-4 w-4" />
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!isComplete && matchedEmotions.length > 0 && (
          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Heart className="mr-2 h-5 w-5 text-pink-500" />
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                  You might be feeling...
                </span>
              </h3>
              <div className="space-y-6">
                {matchedEmotions.map((emotion, index) => (
                  <div
                    key={emotion.name}
                    className={`
                      p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white
                      border border-gray-100 shadow-sm
                      transform transition-all duration-300 hover:scale-102
                      text-gray-800
                      ${index === 0 ? 'ring-2 ring-blue-100' : ''}
                    `}
                  >
                    <div className="flex items-center mb-3">
                      {getEmotionIcon(emotion.name)}
                      <span className="text-lg font-medium ml-2">{emotion.name}</span>
                      {index === 0 && (
                        <span className="ml-3 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                          Best Match
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {emotion.variations.map(variation => (
                        <span 
                          key={variation} 
                          className="px-3 py-1.5 bg-white shadow-sm border border-gray-100 
                                   rounded-full text-sm transition-colors duration-200
                                   hover:bg-gray-50"
                        >
                          {variation}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}