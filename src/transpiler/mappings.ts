// src/transpiler/mappings.ts

type TailwindMap = Record<string, Record<string, string>>;

export const CSS_TO_TAILWIND: TailwindMap = {
  'text-align': {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right',
    'justify': 'text-justify',
  },
  'display': {
    'block': 'block',
    'flex': 'flex',
    'inline': 'inline',
    'grid': 'grid',
    'hidden': 'hidden',
    'none': 'hidden',
  },
  'position': {
    'absolute': 'absolute',
    'relative': 'relative',
    'fixed': 'fixed',
  },
  'font-weight': {
    'bold': 'font-bold',
    'normal': 'font-normal',
    '100': 'font-thin',
    '900': 'font-black',
  },
  // Simple color mapping for example purposes
  // In a real app, you'd use a regex or color library here
  'color': {
    'red': 'text-red-500',
    'blue': 'text-blue-500',
    'white': 'text-white',
    'black': 'text-black',
  },
  'background-color': {
    'red': 'bg-red-500',
    'blue': 'bg-blue-500',
    'white': 'bg-white',
    'black': 'bg-black',
  },
   'margin': {
    '0': 'm-0',
    '4px': 'm-1',
    '8px': 'm-2',
    '16px': 'm-4',
    '24px': 'm-6',
    '32px': 'm-8',
    'auto': 'm-auto',
  },
  'margin-top': {
    '0': 'mt-0',
    '4px': 'mt-1',
    '8px': 'mt-2',
    '16px': 'mt-4',
    '24px': 'mt-6',
  },
  'margin-bottom': {
    '0': 'mb-0',
    '4px': 'mb-1',
    '8px': 'mb-2',
    '16px': 'mb-4',
  },
  'margin-left': {
    '0': 'ml-0',
    '4px': 'ml-1',
    '8px': 'ml-2',
    '16px': 'ml-4',
  },
  'margin-right': {
    '0': 'mr-0',
    '4px': 'mr-1',
    '8px': 'mr-2',
    '16px': 'mr-4',
  },

  'padding': {
    '0': 'p-0',
    '4px': 'p-1',
    '8px': 'p-2',
    '16px': 'p-4',
    '24px': 'p-6',
  },
  'padding-top': {
    '0': 'pt-0',
    '4px': 'pt-1',
    '8px': 'pt-2',
    '16px': 'pt-4',
  },
  'padding-bottom': {
    '0': 'pb-0',
    '4px': 'pb-1',
    '8px': 'pb-2',
    '16px': 'pb-4',
  },

  'width': {
    '100%': 'w-full',
    '50%': 'w-1/2',
    '25%': 'w-1/4',
    '75%': 'w-3/4',
    'auto': 'w-auto',
  },

  'height': {
    '100%': 'h-full',
    '50%': 'h-1/2',
    'auto': 'h-auto',
  },

  'border-width': {
    '0': 'border-0',
    '1px': 'border',
    '2px': 'border-2',
    '4px': 'border-4',
  },

  'border-style': {
    'solid': 'border-solid',
    'dashed': 'border-dashed',
    'dotted': 'border-dotted',
  },

  'border-color': {
    'red': 'border-red-500',
    'blue': 'border-blue-500',
    'black': 'border-black',
    'white': 'border-white',
  },

  'border-radius': {
    '0': 'rounded-none',
    '4px': 'rounded',
    '8px': 'rounded-md',
    '16px': 'rounded-lg',
    '9999px': 'rounded-full',
  },

  'text-transform': {
    'uppercase': 'uppercase',
    'lowercase': 'lowercase',
    'capitalize': 'capitalize',
    'none': 'normal-case',
  },

  'overflow': {
    'hidden': 'overflow-hidden',
    'scroll': 'overflow-scroll',
    'auto': 'overflow-auto',
    'visible': 'overflow-visible',
  },

  'justify-content': {
    'flex-start': 'justify-start',
    'center': 'justify-center',
    'flex-end': 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  },

  'align-items': {
    'flex-start': 'items-start',
    'center': 'items-center',
    'flex-end': 'items-end',
    'stretch': 'items-stretch',
  },

  'flex-direction': {
    'row': 'flex-row',
    'column': 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  },

  'gap': {
    '4px': 'gap-1',
    '8px': 'gap-2',
    '16px': 'gap-4',
    '24px': 'gap-6',
  },

  'opacity': {
    '1': 'opacity-100',
    '0.5': 'opacity-50',
    '0': 'opacity-0',
  },

  'cursor': {
    'pointer': 'cursor-pointer',
    'default': 'cursor-default',
    'not-allowed': 'cursor-not-allowed',
  },

  'white-space': {
    'nowrap': 'whitespace-nowrap',
    'normal': 'whitespace-normal',
    'pre': 'whitespace-pre',
  },

  'text-decoration': {
    'underline': 'underline',
    'line-through': 'line-through',
    'none': 'no-underline',
  },

  'object-fit': {
    'cover': 'object-cover',
    'contain': 'object-contain',
    'fill': 'object-fill',
    'none': 'object-none',
    'scale-down': 'object-scale-down',
  },
};