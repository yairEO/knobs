export function getSetPersistedData( data ){
  // if "persist" is "false", do not save to localstorage
  let _store = this.settings.persist,
      storeKey = '@yaireo/knobs/knobs',
      customKey = typeof _store == 'string' ? '/'+_store : '',
      persistedData = {};

  try{ persistedData = JSON.parse(localStorage[storeKey + customKey]) }
  catch(err){}

  // when wishing to set data:
  if ( _store && data ){
    Object.assign(persistedData, data) // merge new data with persisted data and re-save
    localStorage.setItem(storeKey + customKey, JSON.stringify(persistedData))
    dispatchEvent( new Event('storage') )
  }

  return persistedData
}